export type VariantKey = 'default' | 'anthropic' | 'netflix' | 'meta' | 'yahoo' | 'openai' | 'doordash' | 'reddit'

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
  yahoo: {
    tagline: 'Staff Engineer | Mobile Platform & User Experience',
    description:
      'Building consumer-facing mobile applications at scale with focus on performance, reliability, and user engagement.',
    accentColor: '#7B0099',
    accentColorDark: '#5A0070',
    profileImage: '/profile/profile_yahoo.png',
    prioritySections: ['experience', 'speaking', 'community', 'projects'],
    highlightKeywords: ['Led', 'Built', 'Re-architected', 'CI/CD', 'Play Store', 'cross-functional'],
  },
  openai: {
    tagline: 'Staff Engineer | AI-Integrated Mobile Experiences',
    description:
      'Building mobile applications that leverage AI to create intuitive, intelligent user experiences at scale.',
    accentColor: '#10A37F',
    accentColorDark: '#0d8265',
    profileImage: '/profile/profile_openai.png',
    prioritySections: ['experience', 'speaking', 'community', 'projects'],
    highlightKeywords: ['chat', 'AI', 'Jetpack Compose', 'Built', 'Led', 'redesign'],
  },
  doordash: {
    tagline: 'Senior Engineer | Design Infrastructure & Component Systems',
    description:
      'Building design systems and component libraries that empower designers and engineers to create consistent, high-quality mobile experiences at scale.',
    accentColor: '#FF3000',
    accentColorDark: '#CC2600',
    profileImage: '/profile/profile_doordash.png',
    prioritySections: ['experience', 'speaking', 'community', 'projects'],
    highlightKeywords: ['Jetpack Compose', 'Re-architected', 'Led', 'Coordinating', 'Mentoring', 'Built', 'Refactor', 'cross-functional'],
  },
  reddit: {
    tagline: 'Staff Android Engineer | Scale & Product',
    description:
      '13+ years of experience in architecting high-scale Android applications with a strong product-oriented mindset. Expert in modular design and re-architecting legacy systems for millions of users. Passionate about bridging technical excellence with user-centric experiences. Droidcon Speaker and mentor.',
    accentColor: '#FF4500',
    accentColorDark: '#CC3700',
    profileImage: '/profile/profile_reddit.png',
    prioritySections: ['experience', 'speaking', 'community', 'projects'],
    highlightKeywords: ['Mobile Team Lead', 'Leading', 'Led', 'chat', 'redesign', 'Refactored', 'Re-architected', 'CI/CD', 'Coordinating', 'Mentoring'],
  },
}

export function getVariantConfig(ref: string | null): {
  variant: VariantKey
  config: VariantConfig
  isTargetedVisit: boolean
} {
  const validVariants: VariantKey[] = ['anthropic', 'netflix', 'meta', 'yahoo', 'openai', 'doordash', 'reddit']
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

