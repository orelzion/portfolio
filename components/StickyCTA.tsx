'use client'

import type { VariantKey } from '@/lib/variants'
import { DownloadButton } from './ui/DownloadButton'

interface StickyCTAProps {
  variant: VariantKey
}

export function StickyCTA({ variant }: StickyCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[var(--background)] via-[var(--background)] to-transparent md:hidden z-50">
      <DownloadButton variant={variant} isMobile />
    </div>
  )
}

