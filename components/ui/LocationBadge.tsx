'use client'

interface LocationBadgeProps {
  location: string
  isTargetedVisit: boolean
}

export function LocationBadge({ location, isTargetedVisit }: LocationBadgeProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
      <span className="flex items-center gap-1.5">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        {location}
      </span>
      {isTargetedVisit && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-[var(--accent-color)]/10 text-[var(--accent-color)] transition-colors duration-300">
          <span>🌍</span>
          Open to Relocation
        </span>
      )}
    </div>
  )
}

