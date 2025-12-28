'use client'

import type { VariantKey } from '@/lib/variants'

interface StickyCTAProps {
  variant: VariantKey
}

export function StickyCTA({ variant }: StickyCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[var(--background)] via-[var(--background)] to-transparent md:hidden z-50">
      <a
        href="/Resume.pdf"
        download
        className="flex items-center justify-center gap-2 w-full py-3.5 px-6 text-base font-semibold text-white bg-[var(--accent-color)] hover:bg-[var(--accent-color-dark)] rounded-xl shadow-lg shadow-[var(--accent-color)]/25 transition-all duration-300 active:scale-[0.98]"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  )
}

