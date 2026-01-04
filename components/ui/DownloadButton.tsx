'use client'

import { useState } from 'react'
import type { VariantKey } from '@/lib/variants'
import { trackDownload } from '@/lib/analytics'

interface DownloadButtonProps {
  variant: VariantKey
  className?: string
  isMobile?: boolean
}

export function DownloadButton({ variant, className, isMobile = false }: DownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async () => {
    if (isLoading) return

    setIsLoading(true)

    // Track download event
    trackDownload(variant)

    try {
      const url = `/api/generate-pdf${variant !== 'default' ? `?ref=${variant}` : ''}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('PDF generation failed')
      }

      // Get the blob and create download
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = 'Orel_Zion_Resume.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error('Download error:', error)
      // Fallback to static PDF
      window.open('/Resume.pdf', '_blank')
    } finally {
      setIsLoading(false)
    }
  }

  const baseStyles = isMobile
    ? 'flex items-center justify-center gap-2 w-full py-3.5 px-6 text-base font-semibold text-white rounded-xl shadow-lg shadow-[var(--accent-color)]/25 transition-all duration-300'
    : 'inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-lg transition-all duration-300'

  const enabledStyles = 'bg-[var(--accent-color)] hover:bg-[var(--accent-color-dark)] active:scale-[0.98] cursor-pointer'
  const disabledStyles = 'bg-[var(--accent-color)]/70 cursor-wait'

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className={`${baseStyles} ${isLoading ? disabledStyles : enabledStyles} ${className || ''}`}
    >
      {isLoading ? (
        <>
          <svg
            className="w-4 h-4 md:w-4 md:h-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Generating PDF...</span>
        </>
      ) : (
        <>
          <svg
            className={isMobile ? 'w-5 h-5' : 'w-4 h-4'}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          <span>Download Resume</span>
        </>
      )}
    </button>
  )
}



