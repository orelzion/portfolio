'use client'

import { SectionWrapper } from './ui/SectionWrapper'
import { experience } from '@/lib/content'

interface ExperienceProps {
  highlightKeywords?: string[]
}

export function Experience({ highlightKeywords = [] }: ExperienceProps) {
  // Check if a bullet should be highlighted based on keywords
  const shouldHighlight = (text: string): boolean => {
    if (highlightKeywords.length === 0) return false
    return highlightKeywords.some((keyword) =>
      text.toLowerCase().includes(keyword.toLowerCase())
    )
  }

  return (
    <SectionWrapper title="Experience">
      <div className="space-y-8">
        {experience.map((job) => (
          <article
            key={`${job.company}-${job.title}`}
            className="relative pl-6 md:pl-8 border-l-2 border-zinc-200 dark:border-zinc-800"
          >
            {/* Timeline dot */}
            <div
              className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-[var(--accent-color)] transition-colors duration-300"
              style={{
                boxShadow: '0 0 0 4px var(--background)',
              }}
            />

            <div className="pb-8 last:pb-0">
              {/* Company & Title */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                <div>
                  <h3 className="text-lg font-bold text-[var(--accent-color)] transition-colors duration-300">
                    {job.company}
                  </h3>
                  <p className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                    {job.title}
                  </p>
                </div>
                <span className="text-sm text-zinc-500 dark:text-zinc-500 font-mono">
                  {job.period}
                </span>
              </div>

              {/* Description */}
              <ul className="space-y-2.5">
                {job.description.map((item, i) => {
                  const isHighlighted = shouldHighlight(item)
                  return (
                    <li
                      key={i}
                      className={`text-base leading-relaxed flex gap-2 transition-colors duration-300 ${
                        isHighlighted
                          ? 'text-[var(--accent-color)] font-medium'
                          : 'text-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      <span className="flex-shrink-0 text-[var(--accent-color)] transition-colors duration-300">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </SectionWrapper>
  )
}

