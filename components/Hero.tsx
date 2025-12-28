'use client'

import { ProfileImage } from './ui/ProfileImage'
import { LocationBadge } from './ui/LocationBadge'
import { personalInfo } from '@/lib/content'
import type { VariantConfig, VariantKey } from '@/lib/variants'

interface HeroProps {
  config: VariantConfig
  isTargetedVisit: boolean
  variant: VariantKey
}

export function Hero({ config, isTargetedVisit, variant }: HeroProps) {
  return (
    <section className="py-12 md:py-20">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <ProfileImage
            src={config.profileImage}
            alt={personalInfo.name}
            className="w-40 h-40 md:w-48 md:h-48 ring-4 ring-[var(--accent-color)]/20 transition-all duration-300"
          />
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
            {personalInfo.name}
          </h1>

          <p className="text-xl md:text-2xl font-medium text-[var(--accent-color)] mb-4 transition-colors duration-300">
            {config.tagline}
          </p>

          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 max-w-xl">
            {config.description}
          </p>

          {/* Location Badge */}
          <div className="flex justify-center md:justify-start mb-6">
            <LocationBadge
              location={personalInfo.location}
              isTargetedVisit={isTargetedVisit}
            />
          </div>

          {/* Contact & Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {personalInfo.email}
            </a>
            {personalInfo.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-[var(--accent-color)] transition-colors"
              >
                {link.label}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

