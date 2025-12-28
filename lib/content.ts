export const personalInfo = {
  name: 'Orel Zion',
  location: 'Bnei Brak, Israel',
  email: 'orelzion@gmail.com',
  phone: '052-6656-160',
  links: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/orel-zion-86122665/' },
    { label: 'GitHub', url: 'https://github.com/orelzion' },
    { label: 'Stack Overflow', url: 'https://stackoverflow.com/users/818716/orelzion' },
    { label: 'YouTube', url: 'https://www.youtube.com/@orelzion' },
    { label: 'dev.to', url: 'https://dev.to/orelzion' },
  ],
}

export const summary = {
  title: 'Staff Android Engineer',
  subtitle: '& Mobile Team Lead with 13+ years of experience in building scalable, high-impact Android applications.',
  highlights: [
    'Expert in Kotlin, Jetpack Compose, CI/CD, and mobile architecture.',
    'Skilled in cross-team collaboration, async communication, and mentoring engineers toward growth.',
    'Speaker at Droidcon and Android community events in Tel Aviv.',
    'Proven track record in leading distributed teams and delivering critical mobile features in fast-paced, product-driven environments.',
  ],
}

export interface ExperienceItem {
  company: string
  title: string
  period: string
  description: string[]
  highlights?: string[]
}

export const experience: ExperienceItem[] = [
  {
    company: 'Viz.ai',
    title: 'Mobile Team Lead',
    period: 'May 2024 – Present',
    description: [
      'Leading a compact mobile team (Android + iOS) delivering a full redesign of our in-app chat experience, used daily by clinicians.',
      'Coordinating with cross-functional teams (backend, design, product) to align on goals, timelines, and execution.',
      'Managing sprint planning, progress tracking, and stakeholder communication across the organization.',
      'Mentoring engineers through regular 1:1s and feedback cycles, supporting both technical growth and ownership mindset.',
    ],
  },
  {
    company: 'Viz.ai',
    title: 'Senior Mobile Developer',
    period: 'Jun 2020 – May 2024',
    description: [
      'Led Android development across the org, maintaining the Android guild and setting technical direction.',
      'Built major features: authentication, patient list, clinical cards — using Jetpack Compose, MVVM, Coroutines, Navigation.',
      'Re-architected legacy components to support modularization and testability.',
      'Developed a dynamic medical scan viewer in iOS (Swift, SwiftUI).',
      'Implemented Android CI/CD pipeline with GitHub Actions: from PR checks to Play Store releases.',
    ],
  },
  {
    company: 'VIA',
    title: 'Senior Android Developer',
    period: 'Dec 2017 – Jun 2020',
    description: [
      'Refactored and designed our payment solution with several payment providers (Google Pay, PayPal and Credit Card clearance with BrainTree and Adyen).',
      'Implemented several Google Map solutions such as ride visualization and displaying hundreds of POI markers with info in a performant way.',
      'Worked closely with product and design teams, collaborating with iOS and back-end teams to move fast and deliver large amounts of apps and features quickly.',
    ],
  },
  {
    company: 'Ready4 (LTG Exam Prep)',
    title: 'Senior Android Developer',
    period: 'Apr 2015 – Aug 2017',
    description: [
      'Developed the school matcher part of the app, implementing a generic questionnaire library that was later used in other parts of the app.',
      'Refactored the app to support different flavors.',
      'Integrated CI solution with CircleCI and Fastlane.',
    ],
  },
  {
    company: 'Kaltura',
    title: 'Android Developer',
    period: 'Jun 2014 – May 2015',
    description: [
      'Helped a remote team that worked with our SDK with support and code reviews.',
      'Implemented different apps with different features and themes based on our showcased app.',
    ],
  },
  {
    company: 'Tvinci',
    title: 'Android Developer',
    period: 'Jul 2012 – Jun 2014',
    description: [
      'Developed an app for a client that was very flexibly controlled by the back-end.',
      'Implemented a player solution as part of Tvinci\'s SDK to support different DRM providers.',
    ],
  },
]

export interface SpeakingItem {
  event: string
  title: string
  type: 'conference' | 'meetup'
  url?: string
}

export const publicSpeaking: SpeakingItem[] = [
  {
    event: 'Droidcon NYC',
    title: 'Jetpack Paging 3 in Real Life',
    type: 'conference',
    url: 'https://www.droidcon.com/2022/09/29/jetpack-paging-library-3-in-real-life/',
  },
  {
    event: 'Droidcon Paris',
    title: 'AI Won\'t Take Your Job, But It Will Help You Do It Better',
    type: 'conference',
    url: 'https://www.youtube.com/watch?v=uXaJbBJ2lAY&t=1069s&ab_channel=AndroidMakers',
  },
  {
    event: 'TLV Meetup',
    title: 'Using AI to Boost Developer Workflow (Beyond Code)',
    type: 'meetup',
  },
]

export interface CommunityItem {
  title: string
  year: string
  description: string
  url?: string
  tags?: string[]
}

export const communityContribution: CommunityItem[] = [
  {
    title: 'Michal Sela Hackathon - Safe@Home SDK',
    year: '2025',
    description:
      'Built an Android SDK that secretly activates when triggered, using OpenAI Whisper for transcription and GPT for real-time danger detection to alert authorities and prevent domestic violence.',
    url: 'https://drive.google.com/file/d/1ZM53c-f7dp7x9djtkTPEoVOxVhb84k2W/view?usp=sharing',
    tags: ['AI', 'Social Impact', 'Android SDK'],
  },
  {
    title: 'Android Development Course',
    year: '2020',
    description:
      'Delivered a full Android development course covering core concepts in Kotlin, architecture, and best practices.',
  },
  {
    title: 'MAGSHIMIM Mentorship',
    year: '2019',
    description:
      'Mentored two students as part of the MAGSHIMIM program, guiding them in building a full-stack app using Flask and Android.',
  },
]

export interface WritingItem {
  title: string
  platform: string
  description: string
  url: string
  tags: string[]
}

export const writing: WritingItem[] = [
  {
    title: 'I tried vibe coding, and survived to tell (well kinda)',
    platform: 'dev.to',
    description:
      'A deep dive into AI-assisted development using Claude Code to build a desktop app from scratch as a mobile developer.',
    url: 'https://dev.to/orelzion/i-tried-vibe-coding-and-survived-to-tell-well-kinda-5815',
    tags: ['AI', 'Claude Code', 'Programming'],
  },
]

