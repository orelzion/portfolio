'use client'

import { Suspense, useEffect } from 'react'
import { track } from '@vercel/analytics'
import { useVariant } from '@/hooks/useVariant'
import { Hero } from './Hero'
import { Experience } from './Experience'
import { PublicSpeaking } from './PublicSpeaking'
import { Community } from './Community'
import { Writing } from './Writing'
import { StickyCTA } from './StickyCTA'

function PortfolioInner() {
  const { variant, config, isTargetedVisit } = useVariant()

  // Set CSS custom properties on document root for scrollbar and global access
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', config.accentColor)
    document.documentElement.style.setProperty('--accent-color-dark', config.accentColorDark)
  }, [config.accentColor, config.accentColorDark])

  // Section components mapped by key
  const sectionMap = {
    experience: <Experience key="experience" highlightKeywords={config.highlightKeywords} />,
    speaking: <PublicSpeaking key="speaking" highlightTalks={config.highlightTalks} />,
    community: <Community key="community" />,
    writing: <Writing key="writing" highlighted={config.highlightWriting} />,
  }

  // Get ordered sections based on variant priority
  const orderedSections = config.prioritySections.map(
    (key) => sectionMap[key as keyof typeof sectionMap]
  )

  return (
    <div>
      <div className="min-h-screen bg-[var(--background)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 md:pb-12">
          {/* Hero Section */}
          <Hero config={config} isTargetedVisit={isTargetedVisit} variant={variant} />

          {/* Desktop Resume Download */}
          <div className="hidden md:flex justify-center md:justify-start mb-8">
            <a
              href="/Resume.pdf"
              download
              onClick={() => track('resume_download', { ref: variant, device: 'desktop' })}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[var(--accent-color)] hover:bg-[var(--accent-color-dark)] rounded-lg transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Resume
            </a>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent mb-8" />

          {/* Dynamic Content Sections */}
          {orderedSections}

          {/* Footer */}
          <footer className="py-8 mt-8 border-t border-zinc-200 dark:border-zinc-800 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              © {new Date().getFullYear()} Orel Zion. Built with Next.js & Tailwind CSS.
            </p>
          </footer>
        </div>

        {/* Mobile Sticky CTA */}
        <StickyCTA variant={variant} />
      </div>
    </div>
  )
}

export function PortfolioContent() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-zinc-400">Loading...</div>
        </div>
      }
    >
      <PortfolioInner />
    </Suspense>
  )
}

