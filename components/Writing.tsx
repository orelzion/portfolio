'use client'

import { SectionWrapper } from './ui/SectionWrapper'
import { writing } from '@/lib/content'

interface WritingProps {
  highlighted?: boolean
}

export function Writing({ highlighted = false }: WritingProps) {
  return (
    <SectionWrapper title="Writing">
      <div className="grid gap-4">
        {writing.map((article) => (
          <a
            key={article.title}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group block p-6 rounded-xl transition-all duration-300 ${
              highlighted
                ? 'bg-[var(--accent-color)]/10 border-2 border-[var(--accent-color)]/50 hover:border-[var(--accent-color)]'
                : 'bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-[var(--accent-color)]'
            } hover:shadow-lg hover:shadow-[var(--accent-color)]/10`}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-[var(--accent-color)]/10 text-[var(--accent-color)]">
                  📝 {article.platform}
                </span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs font-medium rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
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
            </div>

            <h3
              className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                highlighted
                  ? 'text-[var(--accent-color)]'
                  : 'text-zinc-900 dark:text-zinc-100 group-hover:text-[var(--accent-color)]'
              }`}
            >
              {article.title}
            </h3>

            <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {article.description}
            </p>
          </a>
        ))}
      </div>
    </SectionWrapper>
  )
}

