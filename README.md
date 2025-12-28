# Orel Zion | Portfolio

A dynamic, mobile-first portfolio built with Next.js 14 that adapts its content and styling based on the visitor's referral source.

## Features

- **Dynamic Variants** - Content and theme adjust based on `?ref=` URL parameter
- **Conditional Relocation Badge** - "Open to Relocation" appears only for targeted visits
- **Variant-Specific Profiles** - Different profile images per referral source
- **Smart Content Highlighting** - Experience bullets and talks highlighted based on relevance
- **Mobile-First Design** - Responsive layout with sticky CTA on mobile
- **Simple Analytics** - Privacy-first analytics tracking page views and link clicks
- **Vercel Speed Insights** - Core Web Vitals monitoring

## Variants

| Variant | URL | Theme | Focus |
|---------|-----|-------|-------|
| Default | `/` | Blue | General Android expertise |
| Anthropic | `/?ref=anthropic` | Sage | AI workflows, product craft |
| Netflix | `/?ref=netflix` | Red | Scale, performance, architecture |
| Meta | `/?ref=meta` | Blue | Cross-team collaboration, systems |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with Analytics
│   ├── page.tsx            # Main page
│   └── globals.css         # Tailwind + CSS custom properties
├── components/
│   ├── Hero.tsx            # Profile, tagline, location
│   ├── Experience.tsx      # Work history timeline
│   ├── PublicSpeaking.tsx  # Conference talks
│   ├── Community.tsx       # Teaching & mentoring
│   ├── Writing.tsx         # Blog posts
│   └── ui/                 # Reusable UI components
├── hooks/
│   └── useVariant.ts       # URL ref detection
├── lib/
│   ├── content.ts          # Resume content
│   └── variants.ts         # Variant configurations
└── public/
    ├── profile/            # Variant profile images
    └── Resume.pdf          # Downloadable resume
```

## Customization

### Adding a New Variant

1. Add variant config in `lib/variants.ts`
2. Add profile image to `public/profile/`
3. Define `highlightKeywords` and `highlightTalks` for content emphasis

### Updating Content

Edit `lib/content.ts` to update:
- Personal info and social links
- Work experience
- Public speaking engagements
- Community contributions
- Writing/blog posts

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Analytics**: Simple Analytics
- **Performance**: Vercel Speed Insights
- **Deployment**: Vercel

## License

MIT
