'use client'

import { SectionWrapper } from './ui/SectionWrapper'
import { communityContribution } from '@/lib/content'

export function Community() {
  return (
    <SectionWrapper title="Community Contribution">
      <div className="grid gap-4 sm:grid-cols-2">
        {communityContribution.map((item) => (
          <article
            key={item.title}
            className="p-5 rounded-xl bg-gradient-to-br from-[var(--accent-color)]/5 to-transparent border border-[var(--accent-color)]/20 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                {item.title}
              </h3>
              <span className="flex-shrink-0 px-2 py-0.5 text-xs font-mono text-[var(--accent-color)] bg-[var(--accent-color)]/10 rounded transition-colors duration-300">
                {item.year}
              </span>
            </div>

            <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </SectionWrapper>
  )
}

