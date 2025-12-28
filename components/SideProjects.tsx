'use client'

import { SectionWrapper } from './ui/SectionWrapper'
import { sideProjects } from '@/lib/content'

export function SideProjects() {
  return (
    <SectionWrapper title="Side Projects">
      <div className="grid gap-4">
        {sideProjects.map((project) => (
          <a
            key={project.title}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-[var(--accent-color)] hover:shadow-lg hover:shadow-[var(--accent-color)]/10 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[var(--accent-color)] transition-colors duration-300">
                {project.title}
              </h3>
              <div className="flex items-center gap-2">
                <span className="flex-shrink-0 px-2 py-0.5 text-xs font-mono text-zinc-500 dark:text-zinc-500">
                  {project.year}
                </span>
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
            </div>

            {project.stats && (
              <div className="mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded-full bg-[var(--accent-color)]/10 text-[var(--accent-color)] transition-colors duration-300">
                  📱 {project.stats}
                </span>
              </div>
            )}

            <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {project.description}
            </p>
          </a>
        ))}
      </div>
    </SectionWrapper>
  )
}

