import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'

// Configure for Vercel serverless
export const maxDuration = 30 // 30 seconds timeout
export const dynamic = 'force-dynamic'

async function getBrowser() {
  // For Vercel production
  if (process.env.VERCEL) {
    return puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
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
    browser = await getBrowser()
    const page = await browser.newPage()

    // Get the base URL for the print page
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'

    // Navigate to print page with variant
    const printUrl = `${baseUrl}/print${ref ? `?ref=${ref}` : ''}`
    
    await page.goto(printUrl, {
      waitUntil: 'networkidle0',
      timeout: 15000,
    })

    // Wait a bit for any CSS to fully load
    await new Promise((resolve) => setTimeout(resolve, 500))

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
      await browser.close()
    }

    // Fallback: redirect to static PDF if generation fails
    return NextResponse.redirect(new URL('/Resume.pdf', request.url))
  }
}

