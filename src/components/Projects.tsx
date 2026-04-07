import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Project data ──────────────────────────────────────────────────────────────
// Add entries here to populate the section. Leave empty to show the "WIP" state.
//
// Required: title, desc, tech, year
// Optional: image (URL), alt (img alt text), url (display URL in browser bar),
//           href (real link opened on click)
//
// Example:
// {
//   title: 'Lumina Pay',
//   year:  '2024',
//   desc:  'Fintech platform with real-time transfers and instant card controls.',
//   tech:  ['React Native', 'Node.js', 'AWS'],
//   url:   'luminapay.app/dashboard',
//   href:  'https://luminapay.app',
//   image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200',
//   alt:   'Mobile banking app interface',
// },

export interface Project {
  title: string
  year:  string
  desc:  string
  tech:  string[]
  url?:  string   // display-only URL shown in the browser chrome
  href?: string   // real link opened when the card is clicked
  image?: string  // full-bleed screenshot
  alt?:  string
}

export const projects: Project[] = []

function MacWindow({ project }: { project: Project }) {
  const inner = (
    <div
      className="mac-window flex flex-col rounded-2xl overflow-hidden"
      style={{
        width:  'min(680px, calc(100vw - 32px))',
        height: 'min(520px, calc(100svh - 160px))',
      }}
    >
      <div className="flex items-center gap-3 px-4 py-2.5 bg-[#252525] border-b border-white/[0.06] shrink-0">
        <div className="flex gap-[5px] shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]/30" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D9A015]/30" />
          <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#14AE28]/30" />
        </div>
        {project.url && (
          <div className="flex-1 max-w-xs mx-2">
            <div className="bg-[#1A1A1A] rounded-[6px] px-3 py-1.5 flex items-center gap-2 border border-white/[0.07]">
              <svg className="w-2.5 h-2.5 text-white/25 shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5.5" width="8" height="5.5" rx="1.5" />
                <path d="M4 5.5V4a2 2 0 014 0v1.5" />
              </svg>
              <span className="font-mono text-[10px] text-white/30 truncate">{project.url}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 min-h-0 relative overflow-hidden bg-[#111]">
        {project.image ? (
          <img src={project.image} alt={project.alt ?? project.title} className="w-full h-full object-cover object-top" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-headline italic font-black text-white/5" style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}>
              {project.title}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-5 md:px-7 pb-5 md:pb-7">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-6">
            <div>
              <h3 className="font-headline italic text-xl md:text-2xl font-bold text-white leading-tight">
                {project.title}
              </h3>
              <p className="font-body text-xs text-white/50 mt-1.5 leading-relaxed max-w-[260px] hidden sm:block">
                {project.desc}
              </p>
            </div>
            <div className="sm:text-right shrink-0">
              <span className="font-mono text-[10px] text-white/30 block mb-2 uppercase tracking-widest">
                {project.year}
              </span>
              <div className="flex flex-wrap gap-1.5 sm:justify-end">
                {project.tech.map((t) => (
                  <span key={t} className="px-2 py-1 text-[9px] font-label uppercase tracking-widest border border-white/10 rounded-full text-white/50 bg-white/5">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  if (project.href) {
    return (
      <a href={project.href} target="_blank" rel="noopener noreferrer" className="block">
        {inner}
      </a>
    )
  }
  return inner
}

function EmptyState() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef   = useRef<HTMLDivElement>(null)
  const line1Ref   = useRef<HTMLDivElement>(null)
  const line2Ref   = useRef<HTMLDivElement>(null)
  const bodyRef    = useRef<HTMLDivElement>(null)
  const badgeRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        defaults: { ease: 'power3.out' },
      })
      tl.fromTo(labelRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(line1Ref.current, { opacity: 0, y: 40, skewY: 3 }, { opacity: 1, y: 0, skewY: 0, duration: 0.9 }, '-=0.2')
        .fromTo(line2Ref.current, { opacity: 0, y: 40, skewY: 3 }, { opacity: 1, y: 0, skewY: 0, duration: 0.9 }, '-=0.7')
        .fromTo(bodyRef.current,  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
        .fromTo(badgeRef.current, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.6 }, '-=0.3')
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="h-screen relative overflow-hidden flex flex-col"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div
        className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-12 pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-headline italic font-black text-white leading-none"
          style={{ fontSize: 'clamp(80px, 22vw, 380px)', opacity: 0.035 }}
        >
          WIP
        </span>
      </div>

      <div
        ref={labelRef}
        className="shrink-0 px-6 md:px-10 pt-20 md:pt-14 flex items-center justify-between z-10 opacity-0"
      >
        <span className="font-label text-[10px] font-bold tracking-[0.3em] text-white/25 uppercase">
          Selected Works
        </span>
        <span className="font-mono text-[10px] text-white/15 uppercase tracking-widest">
          {new Date().getFullYear()}
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 pb-8 relative z-10">
        <div className="max-w-xl">
          <div
            ref={line1Ref}
            className="font-headline font-light text-white leading-[0.95] opacity-0"
            style={{ fontSize: 'clamp(2.75rem, 9vw, 6rem)' }}
          >
            Work in
          </div>
          <div
            ref={line2Ref}
            className="font-headline italic font-black leading-[0.95] mb-8 md:mb-10 opacity-0"
            style={{
              fontSize: 'clamp(2.75rem, 9vw, 6rem)',
              WebkitTextStroke: '1.5px #c8f135',
              color: 'transparent',
            }}
          >
            progress.
          </div>
          <div
            ref={bodyRef}
            className="font-body text-sm text-white/40 leading-relaxed mb-8 md:mb-10 opacity-0"
            style={{ maxWidth: '26rem' }}
          >
            Case studies are being prepared. Real projects,
            real outcomes — no lorem ipsum.
          </div>
          <div
            ref={badgeRef}
            className="inline-flex flex-wrap items-center gap-3 border border-white/10 rounded-full px-4 py-2.5 opacity-0"
          >
            <span
              className="w-2 h-2 rounded-full bg-[#c8f135] shrink-0"
              style={{ boxShadow: '0 0 8px #c8f135, 0 0 16px #c8f13560' }}
            />
            <span className="font-label text-[10px] tracking-[0.18em] uppercase text-white/50">
              Available for new projects
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]" />
    </section>
  )
}

function PopulatedProjects() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.project-card', section)
      const bgs   = gsap.utils.toArray<HTMLElement>('.project-bg', section)

      if (cards.length < 2) return

      gsap.set(cards, { xPercent: 100 })
      gsap.set(cards[0], { xPercent: 0 })
      gsap.set(bgs[0], { opacity: 1 })
      if (bgs.length > 1) gsap.set(bgs.slice(1), { opacity: 0 })

      const tl = gsap.timeline()
      cards.forEach((_, i) => {
        if (i === cards.length - 1) return
        tl.to(cards[i],     { xPercent: -100, duration: 1, ease: 'none' }, i)
        tl.to(cards[i + 1], { xPercent: 0,    duration: 1, ease: 'none' }, i)
        tl.to(bgs[i],       { opacity: 0,     duration: 0.4, ease: 'none' }, i + 0.3)
        tl.to(bgs[i + 1],   { opacity: 1,     duration: 0.4, ease: 'none' }, i + 0.3)
      })

      ScrollTrigger.create({
        trigger: section,
        pin: true,
        pinSpacing: true,
        start: 'top top',
        end: () => `+=${(projects.length - 1) * (window.visualViewport?.height ?? window.innerHeight)}`,
        scrub: 1.2,
        animation: tl,
        invalidateOnRefresh: true,
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="h-screen relative overflow-hidden">

      {projects.map((project) => (
        <div key={`bg-${project.title}`} className="project-bg absolute inset-0 z-0">
          {project.image ? (
            <img src={project.image} alt="" aria-hidden="true" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-[#111]" />
          )}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span
              className="font-headline italic font-black text-white"
              style={{ fontSize: 'clamp(80px, 12vw, 160px)', opacity: 0.07 }}
            >
              {project.title}
            </span>
          </div>
        </div>
      ))}

      <div className="absolute top-0 left-0 right-0 px-6 md:px-10 pt-20 md:pt-14 z-30 flex items-center justify-between pointer-events-none">
        <span className="font-label text-[10px] font-bold tracking-[0.3em] text-white/25 uppercase">
          Selected Works
        </span>
        <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest hidden md:block">
          scroll →
        </span>
      </div>

      {projects.map((project) => (
        <div
          key={project.title}
          className="project-card absolute inset-0 z-10 flex items-center justify-center"
          style={{ paddingTop: '80px', paddingBottom: '48px', paddingLeft: '16px', paddingRight: '16px' }}
        >
          <div className="mx-auto">
            <MacWindow project={project} />
          </div>
        </div>
      ))}
    </section>
  )
}

export default function Projects() {
  return projects.length === 0 ? <EmptyState /> : <PopulatedProjects />
}
