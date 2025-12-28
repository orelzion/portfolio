'use client'

import { SectionWrapper } from './ui/SectionWrapper'
import { communityContribution } from '@/lib/content'

export function Community() {
  return (
    <SectionWrapper title="Community Contribution">
      <div className="grid gap-4 sm:grid-cols-2">
        {communityContribution.map((item) => {
          const hasLink = !!item.url
          const Component = hasLink ? 'a' : 'article'
          const linkProps = hasLink
            ? {
                href: item.url,
                target: '_blank',
                rel: 'noopener noreferrer',
              }
            : {}

          return (
            <Component
              key={item.title}
              {...linkProps}
              className={`p-5 rounded-xl transition-all duration-300 ${
                hasLink
                  ? 'bg-gradient-to-br from-[var(--accent-color)]/5 to-transparent border border-[var(--accent-color)]/20 hover:border-[var(--accent-color)]/50 hover:shadow-lg hover:shadow-[var(--accent-color)]/10 cursor-pointer'
                  : 'bg-gradient-to-br from-[var(--accent-color)]/5 to-transparent border border-[var(--accent-color)]/20'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="flex-shrink-0 px-2 py-0.5 text-xs font-mono text-[var(--accent-color)] bg-[var(--accent-color)]/10 rounded transition-colors duration-300">
                    {item.year}
                  </span>
                  {hasLink && (
                    <svg
                      className="w-4 h-4 text-zinc-400 group-hover:text-[var(--accent-color)] transition-colors duration-300 flex-shrink-0"
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
              </div>

              {item.tags && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs font-medium rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {item.description}
              </p>
            </Component>
          )
        })}
      </div>
    </SectionWrapper>
  )
}

