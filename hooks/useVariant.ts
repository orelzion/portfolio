'use client'

import { useSearchParams } from 'next/navigation'
import { getVariantConfig, type VariantKey, type VariantConfig } from '@/lib/variants'

export interface UseVariantReturn {
  variant: VariantKey
  config: VariantConfig
  isTargetedVisit: boolean
}

export function useVariant(): UseVariantReturn {
  const searchParams = useSearchParams()
  const ref = searchParams?.get('ref')

  return getVariantConfig(ref)
}

