import { NextRequest, NextResponse } from 'next/server'
import puppeteer, { Browser } from 'puppeteer-core'
import chromium from '@sparticuz/chromium'

// Configure for Vercel serverless
export const maxDuration = 60 // 60 seconds timeout
export const dynamic = 'force-dynamic'

// Keep browser instance between invocations (warm starts)
let browser: Browser | null = null

// Chrome args optimized for serverless (from https://dev.to/travisbeck/how-to-generate-pdfs-with-puppeteer-on-vercel-in-2024-1dm2)
const chromeArgs = [
  '--font-render-hinting=none',
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-gpu',
  '--disable-dev-shm-usage',
  '--disable-accelerated-2d-canvas',
  '--disable-animations',
  '--disable-background-timer-throttling',
  '--disable-restore-session-state',
  '--single-process',
]

async function getBrowser() {
  const isLocal = process.env.NODE_ENV === 'development'
  
  // Reuse browser if still connected
  if (browser?.connected) {
    return browser
  }

  if (isLocal) {
    // For local development - use installed Chrome
    browser = await puppeteer.launch({
      channel: 'chrome',
      headless: true,
    })
  } else {
    // For Vercel production
    browser = await puppeteer.launch({
      args: chromeArgs,
      executablePath: await chromium.executablePath(),
      headless: true,
      ignoreHTTPSErrors: true,
    })
  }
  
  return browser
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const ref = searchParams.get('ref') || ''
  const isLocal = process.env.NODE_ENV === 'development'

  try {
    // Get the base URL from the request headers (works on Vercel)
    const host = request.headers.get('host')
    const protocol = request.headers.get('x-forwarded-proto') || 'https'
    const baseUrl = host ? `${protocol}://${host}` : 'http://localhost:3000'

    console.log('PDF Generation - baseUrl:', baseUrl, 'ref:', ref)

    const browserInstance = await getBrowser()
    const page = await browserInstance.newPage()
    
    await page.emulateMediaType('print')

    // Navigate to print page with variant
    const printUrl = `${baseUrl}/print${ref ? `?ref=${ref}` : ''}`
    console.log('Navigating to:', printUrl)
    
    const response = await page.goto(printUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    })

    if (!response || !response.ok()) {
      throw new Error('Failed to load the page for PDF generation')
    }

    // Generate PDF
    const pdf = await page.pdf({
      format: 'letter',
      printBackground: true,
      omitBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in',
      },
    })

    // Close all open pages to avoid resource leaks (but keep browser for warm starts)
    const pages = await browserInstance.pages()
    for (const openPage of pages) {
      await openPage.close()
    }

    // Close browser only in local dev
    if (isLocal) {
      await browserInstance.close()
      browser = null
    }

    console.log('PDF generated successfully, size:', pdf.length)

    // Convert Uint8Array to Buffer for NextResponse
    const pdfBuffer = Buffer.from(pdf)

    // Return PDF as downloadable file
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Orel_Zion_Resume.pdf"',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    })
  } catch (error) {
    console.error('PDF generation error:', error)

    // Return error response so we can debug
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new NextResponse(
      JSON.stringify({ 
        error: 'PDF generation failed', 
        message: errorMessage,
        fallback: '/Resume.pdf'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}

