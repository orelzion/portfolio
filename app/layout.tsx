import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'
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
    '13+ years of experience in building scalable, high-impact Android applications. Expert in Kotlin, Jetpack Compose, CI/CD, and mobile architecture. Speaker at Droidcon NYC and Paris.',
  keywords: [
    'Orel Zion',
    'Android Engineer',
    'Staff Engineer',
    'Mobile Developer',
    'Mobile Team Lead',
    'Kotlin',
    'Jetpack Compose',
    'Android Development',
    'CI/CD',
    'Mobile Architecture',
    'MVVM',
    'Coroutines',
    'Team Leadership',
    'Droidcon Speaker',
    'AI Integration',
    'React Native',
    'iOS Development',
    'Swift',
    'SwiftUI',
  ],
  authors: [{ name: 'Orel Zion', url: 'https://orelzion.dev' }],
  creator: 'Orel Zion',
  openGraph: {
    title: 'Orel Zion | Staff Android Engineer & Mobile Team Lead',
    description:
      '13+ years building scalable Android apps. Droidcon speaker. Expert in Kotlin, Jetpack Compose, and mobile architecture.',
    type: 'profile',
    locale: 'en_US',
    url: 'https://orelzion.dev',
    siteName: 'Orel Zion Portfolio',
  },
  twitter: {
    card: 'summary',
    title: 'Orel Zion | Staff Android Engineer',
    description: '13+ years building scalable Android apps. Droidcon speaker.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Orel Zion',
              jobTitle: 'Staff Android Engineer & Mobile Team Lead',
              description: '13+ years of experience in building scalable, high-impact Android applications',
              url: 'https://orelzion.dev',
              email: 'orelzion@gmail.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Bnei Brak',
                addressCountry: 'Israel',
              },
              alumniOf: {
                '@type': 'Organization',
                name: 'Various Tech Companies',
              },
              knowsAbout: [
                'Android Development',
                'Kotlin',
                'Jetpack Compose',
                'Mobile Architecture',
                'CI/CD',
                'Team Leadership',
                'iOS Development',
                'Swift',
                'SwiftUI',
              ],
              sameAs: [
                'https://www.linkedin.com/in/orel-zion-86122665/',
                'https://github.com/orelzion',
                'https://stackoverflow.com/users/818716/orelzion',
                'https://www.youtube.com/@orelzion',
                'https://dev.to/orelzion',
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
        <Script
          async
          src="https://scripts.simpleanalyticscdn.com/latest.js"
        />
      </body>
    </html>
  )
}
