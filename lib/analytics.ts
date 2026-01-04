'use client'

import { track } from '@vercel/analytics'

// Declare Simple Analytics global function
declare global {
  interface Window {
    sa_event?: (eventName: string, data?: Record<string, any>) => void
    sa_pageview?: (url: string) => void
  }
}

/**
 * Track an event to both Vercel Analytics and Simple Analytics
 */
export function trackEvent(
  eventName: string,
  properties?: Record<string, any>
) {
  // Track to Vercel Analytics
  track(eventName, properties)

  // Track to Simple Analytics
  // Simple Analytics uses sa_event() for custom events
  if (typeof window !== 'undefined') {
    if (window.sa_event) {
      // If properties exist, pass them as the second argument
      if (properties && Object.keys(properties).length > 0) {
        window.sa_event(eventName, properties)
      } else {
        window.sa_event(eventName)
      }
    }
  }
}

/**
 * Track page view with ref parameter
 */
export function trackPageView(ref: string | null) {
  const properties: Record<string, any> = {}
  
  if (ref) {
    properties.ref = ref
    properties.variant = ref
  }

  trackEvent('page_view', properties)
}

/**
 * Track download button click
 */
export function trackDownload(variant: string) {
  trackEvent('download_resume', {
    variant,
    source: variant !== 'default' ? 'variant' : 'default',
  })
}

/**
 * Track social link click
 */
export function trackSocialLink(platform: string, variant: string) {
  trackEvent('social_link_click', {
    platform,
    variant,
  })
}

/**
 * Track public speaking link click
 */
export function trackSpeakingLink(eventName: string, variant: string) {
  trackEvent('speaking_link_click', {
    event: eventName,
    variant,
  })
}

