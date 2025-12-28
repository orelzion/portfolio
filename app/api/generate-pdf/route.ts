import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'

// Configure for Vercel serverless - need more memory for Chromium
export const maxDuration = 60 // 60 seconds timeout
export const dynamic = 'force-dynamic'

async function getBrowser() {
  // For Vercel production
  if (process.env.VERCEL) {
    const executablePath = await chromium.executablePath()
    console.log('Chromium executable path:', executablePath)
    
    return puppeteer.launch({
      args: [
        ...chromium.args,
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
      ],
      defaultViewport: { width: 816, height: 1056 }, // Letter size at 96 DPI
      executablePath,
      headless: true,
    })
  }

  // For local development - try to find Chrome
  const possiblePaths = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  ]

  for (const executablePath of possiblePaths) {
    try {
      return await puppeteer.launch({
        executablePath,
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      })
    } catch {
      continue
    }
  }

  throw new Error('Could not find Chrome installation')
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const ref = searchParams.get('ref') || ''

  let browser = null

  try {
    // Get the base URL from the request headers (works on Vercel)
    const host = request.headers.get('host')
    const protocol = request.headers.get('x-forwarded-proto') || 'https'
    const baseUrl = host ? `${protocol}://${host}` : 'http://localhost:3000'

    console.log('PDF Generation - baseUrl:', baseUrl, 'ref:', ref)

    browser = await getBrowser()
    const page = await browser.newPage()

    // Navigate to print page with variant
    const printUrl = `${baseUrl}/print${ref ? `?ref=${ref}` : ''}`
    console.log('Navigating to:', printUrl)
    
    await page.goto(printUrl, {
      waitUntil: 'networkidle0',
      timeout: 20000,
    })

    // Wait a bit for any CSS to fully load
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Generate PDF
    const pdf = await page.pdf({
      format: 'letter',
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in',
      },
      preferCSSPageSize: false,
    })

    await browser.close()
    console.log('PDF generated successfully, size:', pdf.length)

    // Return PDF as downloadable file
    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Orel_Zion_Resume.pdf"',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    })
  } catch (error) {
    console.error('PDF generation error:', error)
    
    if (browser) {
      try {
        await browser.close()
      } catch (closeError) {
        console.error('Error closing browser:', closeError)
      }
    }

    // Return error response so we can debug (instead of silent fallback)
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

