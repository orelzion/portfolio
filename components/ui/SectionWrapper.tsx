interface SectionWrapperProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function SectionWrapper({ title, children, className = '' }: SectionWrapperProps) {
  return (
    <section className={`py-12 ${className}`}>
      <h2 className="text-2xl font-bold mb-8 text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
        <span className="w-8 h-1 bg-[var(--accent-color)] rounded-full transition-colors duration-300" />
        {title}
      </h2>
      {children}
    </section>
  )
}

