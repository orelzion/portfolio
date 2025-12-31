import { Suspense } from 'react'
import { getVariantConfig, type VariantConfig } from '@/lib/variants'
import {
  personalInfo,
  summary,
  experience,
  publicSpeaking,
  communityContribution,
  writing,
  sideProjects,
} from '@/lib/content'
import './print.css'

// Section components for print
function ContactSection() {
  return (
    <header className="print-header">
      <h1 className="print-name">{personalInfo.name}</h1>
      <div className="print-contact">
        <span>{personalInfo.location}</span>
        <span className="print-separator">•</span>
        <span>{personalInfo.email}</span>
        <span className="print-separator">•</span>
        <span>{personalInfo.phone}</span>
      </div>
      <div className="print-links">
        {personalInfo.links.map((link, i) => (
          <span key={link.label}>
            <a href={link.url} className="print-link">
              {link.label}
            </a>
            {i < personalInfo.links.length - 1 && <span className="print-separator">•</span>}
          </span>
        ))}
      </div>
    </header>
  )
}

function SummarySection({ config }: { config: VariantConfig }) {
  return (
    <section className="print-section print-summary-section">
      <h2 className="print-section-title" style={{ borderColor: config.accentColor }}>
        Summary
      </h2>
      <p className="print-tagline">{config.tagline}</p>
      <p className="print-description">{config.description}</p>
      <ul className="print-highlights">
        {summary.highlights.map((highlight, i) => (
          <li key={i}>{highlight}</li>
        ))}
      </ul>
    </section>
  )
}

function ExperienceSection({
  config,
  highlightKeywords,
}: {
  config: VariantConfig
  highlightKeywords?: string[]
}) {
  const highlightText = (text: string) => {
    if (!highlightKeywords || highlightKeywords.length === 0) return text

    let result = text
    highlightKeywords.forEach((keyword) => {
      const regex = new RegExp(`(${keyword})`, 'gi')
      result = result.replace(regex, `<mark class="print-highlight">$1</mark>`)
    })
    return result
  }

  return (
    <section className="print-section print-experience-section">
      <h2 className="print-section-title" style={{ borderColor: config.accentColor }}>
        Professional Experience
      </h2>
      {experience.map((job, i) => (
        <div key={i} className="print-job">
          <div className="print-job-header">
            <div>
              <h3 className="print-job-title">{job.title}</h3>
              <p className="print-company">{job.company}</p>
            </div>
            <span className="print-period">{job.period}</span>
          </div>
          <ul className="print-job-bullets">
            {job.description.map((bullet, j) => (
              <li
                key={j}
                dangerouslySetInnerHTML={{ __html: highlightText(bullet) }}
              />
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}

function SpeakingSection({
  config,
  highlightTalks,
}: {
  config: VariantConfig
  highlightTalks?: string[]
}) {
  return (
    <section className="print-section">
      <h2 className="print-section-title" style={{ borderColor: config.accentColor }}>
        Public Speaking
      </h2>
      <div className="print-speaking-grid">
        {publicSpeaking.map((talk, i) => {
          const isHighlighted = highlightTalks?.some((t) =>
            talk.event.toLowerCase().includes(t.toLowerCase())
          )
          return (
            <div
              key={i}
              className={`print-speaking-item ${isHighlighted ? 'print-highlighted' : ''}`}
            >
              <span className="print-event">{talk.event}</span>
              <span className="print-talk-title">
                {talk.title}
                {talk.url && (
                  <span className="print-url"> ({talk.url})</span>
                )}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function CommunitySection({ config }: { config: VariantConfig }) {
  return (
    <section className="print-section">
      <h2 className="print-section-title" style={{ borderColor: config.accentColor }}>
        Community Contribution
      </h2>
      {communityContribution.map((item, i) => (
        <div key={i} className="print-community-item">
          <div className="print-community-header">
            <h3 className="print-community-title">{item.title}</h3>
            <span className="print-year">{item.year}</span>
          </div>
          <p className="print-community-desc">{item.description}</p>
          {item.url && <p className="print-url">{item.url}</p>}
          {item.tags && (
            <div className="print-tags">
              {item.tags.map((tag) => (
                <span key={tag} className="print-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  )
}

function WritingSection({ config }: { config: VariantConfig }) {
  if (writing.length === 0) return null
  return (
    <section className="print-section">
      <h2 className="print-section-title" style={{ borderColor: config.accentColor }}>
        Writing
      </h2>
      {writing.map((article, i) => (
        <div key={i} className="print-writing-item">
          <h3 className="print-writing-title">{article.title}</h3>
          <p className="print-writing-platform">{article.platform}</p>
          <p className="print-writing-desc">{article.description}</p>
          <p className="print-url">{article.url}</p>
        </div>
      ))}
    </section>
  )
}

function ProjectsSection({ config }: { config: VariantConfig }) {
  if (sideProjects.length === 0) return null
  return (
    <section className="print-section">
      <h2 className="print-section-title" style={{ borderColor: config.accentColor }}>
        Side Projects
      </h2>
      {sideProjects.map((project, i) => (
        <div key={i} className="print-project-item">
          <div className="print-project-header">
            <h3 className="print-project-title">{project.title}</h3>
            <span className="print-year">Since {project.year}</span>
          </div>
          <p className="print-project-desc">{project.description}</p>
          {project.stats && <p className="print-project-stats">{project.stats}</p>}
          {project.url && <p className="print-url">{project.url}</p>}
        </div>
      ))}
    </section>
  )
}

// Main print page component
interface PrintPageProps {
  searchParams: Promise<{ ref?: string }>
}

async function PrintContent({ searchParams }: PrintPageProps) {
  const params = await searchParams
  const ref = params.ref || null
  const { config } = getVariantConfig(ref)

  // Map section keys to components
  const getSectionComponent = (key: string) => {
    switch (key) {
      case 'experience':
        return (
          <ExperienceSection
            key="experience"
            config={config}
            highlightKeywords={config.highlightKeywords}
          />
        )
      case 'speaking':
        return (
          <SpeakingSection
            key="speaking"
            config={config}
            highlightTalks={config.highlightTalks}
          />
        )
      case 'community':
        return <CommunitySection key="community" config={config} />
      case 'writing':
        return <WritingSection key="writing" config={config} />
      case 'projects':
        return <ProjectsSection key="projects" config={config} />
      default:
        return null
    }
  }

  // For PDF, always put Experience first (after Summary) for ATS and to ensure it's on first page
  // Then add other sections in their priority order (excluding experience since it's already first)
  const otherSections = config.prioritySections
    .filter((key) => key !== 'experience')
    .map((key) => getSectionComponent(key))
  
  const experienceSection = getSectionComponent('experience')

  return (
    <div className="print-container" style={{ '--accent-color': config.accentColor } as React.CSSProperties}>
      <ContactSection />
      <SummarySection config={config} />
      {experienceSection}
      <div className="print-page-break-before">
        {otherSections}
      </div>
    </div>
  )
}

export default function PrintPage(props: PrintPageProps) {
  return (
    <Suspense fallback={<div className="print-loading">Loading resume...</div>}>
      <PrintContent {...props} />
    </Suspense>
  )
}

