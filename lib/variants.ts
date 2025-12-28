export type VariantKey = 'default' | 'anthropic' | 'netflix' | 'meta'

export interface VariantConfig {
  tagline: string
  description: string
  accentColor: string
  accentColorDark: string
  profileImage: string
  prioritySections: string[]
  // Keywords to highlight in experience bullets
  highlightKeywords?: string[]
  // Talk events to highlight in public speaking
  highlightTalks?: string[]
  // Highlight writing section
  highlightWriting?: boolean
}

export const variants: Record<VariantKey, VariantConfig> = {
  default: {
    tagline: 'Staff Android Engineer & Mobile Team Lead',
    description:
      '13+ years of experience in building scalable, high-impact Android applications.',
    accentColor: '#2563eb',
    accentColorDark: '#1d4ed8',
    profileImage: '/profile/profile_main.png',
    prioritySections: ['speaking', 'community', 'projects', 'experience'],
  },
  anthropic: {
    tagline: 'Staff Android Engineer | Product & Craft',
    description:
      'Specializing in building intuitive, high-performance mobile experiences from the ground up. Expert in Jetpack Compose and AI-integrated workflows.',
    accentColor: '#d4a574',
    accentColorDark: '#b8956a',
    profileImage: '/profile/profile_anthropic.png',
    prioritySections: ['speaking', 'community', 'writing', 'projects', 'experience'],
    highlightKeywords: ['redesign', 'Jetpack Compose', 'chat', 'Mentoring', 'feedback'],
    highlightTalks: ['Droidcon Paris'],
    highlightWriting: true,
  },
  netflix: {
    tagline: 'Staff Engineer | High-Scale Architecture & Performance',
    description:
      'Obsessed with performance, modularity, and engineering excellence for millions of users.',
    accentColor: '#db0000',
    accentColorDark: '#b80000',
    profileImage: '/profile/profile_netflix.png',
    prioritySections: ['speaking', 'community', 'projects', 'experience'],
    highlightKeywords: ['Re-architected', 'modularization', 'CI/CD', 'performant', 'Led', 'Play Store'],
  },
  meta: {
    tagline: 'Staff Engineer | Systems Thinker & Open Source Contributor',
    description:
      'Driving cross-team efficiency and re-architecting legacy systems for global scale.',
    accentColor: '#0668E1',
    accentColorDark: '#0553b8',
    profileImage: '/profile/profile_meta.png',
    prioritySections: ['speaking', 'community', 'projects', 'experience'],
    highlightKeywords: ['cross-functional', 'Coordinating', 'Re-architected', 'guild', 'org', 'quickly', 'stakeholder'],
  },
}

export function getVariantConfig(ref: string | null): {
  variant: VariantKey
  config: VariantConfig
  isTargetedVisit: boolean
} {
  const validVariants: VariantKey[] = ['anthropic', 'netflix', 'meta']
  const variant: VariantKey = validVariants.includes(ref as VariantKey)
    ? (ref as VariantKey)
    : 'default'
  const isTargetedVisit = ref !== null && ref !== ''

  return {
    variant,
    config: variants[variant],
    isTargetedVisit,
  }
}

