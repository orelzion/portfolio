import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Orel Zion | Staff Android Engineer & Mobile Team Lead',
  description:
    '13+ years of experience in building scalable, high-impact Android applications. Expert in Kotlin, Jetpack Compose, CI/CD, and mobile architecture.',
  keywords: [
    'Android Engineer',
    'Mobile Developer',
    'Kotlin',
    'Jetpack Compose',
    'Team Lead',
    'Staff Engineer',
  ],
  authors: [{ name: 'Orel Zion' }],
  openGraph: {
    title: 'Orel Zion | Staff Android Engineer & Mobile Team Lead',
    description:
      '13+ years of experience in building scalable, high-impact Android applications.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
