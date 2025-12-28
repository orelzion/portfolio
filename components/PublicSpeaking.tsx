'use client'

import { SectionWrapper } from './ui/SectionWrapper'
import { publicSpeaking } from '@/lib/content'

interface PublicSpeakingProps {
  highlightTalks?: string[]
}

export function PublicSpeaking({ highlightTalks = [] }: PublicSpeakingProps) {
  const isHighlighted = (eventName: string): boolean => {
    return highlightTalks.some((t) => eventName.toLowerCase().includes(t.toLowerCase()))
  }

  return (
    <SectionWrapper title="Public Speaking">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {publicSpeaking.map((talk) => {
          const hasLink = !!talk.url
          const highlighted = isHighlighted(talk.event)
          const Component = hasLink ? 'a' : 'article'
          const linkProps = hasLink
            ? {
                href: talk.url,
                target: '_blank',
                rel: 'noopener noreferrer',
              }
            : {}

          return (
            <Component
              key={talk.title}
              {...linkProps}
              className={`group block p-5 rounded-xl transition-all duration-300 ${
                highlighted
                  ? 'bg-[var(--accent-color)]/10 border-2 border-[var(--accent-color)]/50'
                  : 'bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800'
              } ${
                hasLink
                  ? 'hover:border-[var(--accent-color)] hover:shadow-lg hover:shadow-[var(--accent-color)]/10 cursor-pointer'
                  : ''
              }`}
            >
              {/* Event Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                    talk.type === 'conference'
                      ? 'bg-[var(--accent-color)]/10 text-[var(--accent-color)]'
                      : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                  } transition-colors duration-300`}
                >
                  {talk.type === 'conference' ? '🎤 Conference' : '💬 Meetup'}
                </span>
                {/* External link icon - only show if has link */}
                {hasLink && (
                  <svg
                    className="w-4 h-4 text-zinc-400 group-hover:text-[var(--accent-color)] transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                )}
              </div>

              {/* Event Name */}
              <h3
                className={`text-base font-bold mb-2 transition-colors duration-300 ${
                  highlighted
                    ? 'text-[var(--accent-color)]'
                    : 'text-zinc-900 dark:text-zinc-100'
                } ${hasLink ? 'group-hover:text-[var(--accent-color)]' : ''}`}
              >
                {talk.event}
              </h3>

              {/* Talk Title */}
              <p className={`text-base leading-relaxed ${
                highlighted ? 'text-zinc-700 dark:text-zinc-300' : 'text-zinc-600 dark:text-zinc-400'
              }`}>
                "{talk.title}"
              </p>
            </Component>
          )
        })}
      </div>
    </SectionWrapper>
  )
}

