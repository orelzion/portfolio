import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium-min'

// Configure for Vercel serverless
export const maxDuration = 60 // 60 seconds timeout
export const dynamic = 'force-dynamic'

// Remote Chromium executable (from https://community.vercel.com/t/sparticuz-chromium-min-working-with-vercel-for-pdf/7877)
const CHROMIUM_REMOTE_URL = 'https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar'

async function getBrowser() {
  const isLocal = process.env.NODE_ENV === 'development'

  if (isLocal) {
    // For local development - use installed Chrome
    return await puppeteer.launch({
      channel: 'chrome',
      headless: true,
    })
  }

  // For Vercel production - download chromium from remote URL
  return await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(CHROMIUM_REMOTE_URL),
    defaultViewport: null,
    headless: true,
  })
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const ref = searchParams.get('ref') || ''

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

    // Close browser after use
    await browserInstance.close()

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

