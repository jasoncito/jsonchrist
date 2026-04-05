import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'Lumina Pay',
    year: '2024',
    tech: ['React Native', 'Node.js'],
    url: 'luminapay.app/dashboard',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200',
    alt: 'Mobile banking app user interface',
    desc: 'Fintech payment platform with real-time transfers, smart analytics, and instant card controls.',
  },
  {
    title: 'Atlas CRM',
    year: '2023',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL'],
    url: 'atlas-crm.io/contacts',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
    alt: 'CRM dashboard interface',
    desc: 'Full-featured CRM with pipeline management, email sequences, and revenue forecasting.',
  },
  {
    title: 'Verve Analytics',
    year: '2023',
    tech: ['AWS', 'React', 'D3.js'],
    url: 'verve.analytics/overview',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
    alt: 'Data analytics dashboard',
    desc: 'Real-time data platform processing 10M+ events daily with custom visualization engine.',
  },
]

type Project = (typeof projects)[number]

function MacWindow({ project }: { project: Project }) {
  return (
    <div
      className="mac-window flex flex-col rounded-2xl overflow-hidden"
      style={{
        width: 'min(680px, calc(100vw - 48px))',
        height: 'min(520px, calc(100vh - 200px))',
      }}
    >
      {/* macOS chrome */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-[#252525] border-b border-white/[0.06] shrink-0">
        <div className="flex gap-[5px] shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]/30" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D9A015]/30" />
          <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#14AE28]/30" />
        </div>
        <div className="flex-1 max-w-xs mx-2">
          <div className="bg-[#1A1A1A] rounded-[6px] px-3 py-1.5 flex items-center gap-2 border border-white/[0.07]">
            <svg className="w-2.5 h-2.5 text-white/25 shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5.5" width="8" height="5.5" rx="1.5" />
              <path d="M4 5.5V4a2 2 0 014 0v1.5" />
            </svg>
            <span className="font-mono text-[10px] text-white/30 truncate">{project.url}</span>
          </div>
        </div>
      </div>
      {/* Screenshot */}
      <div className="flex-1 min-h-0 relative overflow-hidden bg-[#111]">
        <img src={project.image} alt={project.alt} className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-7 pb-7">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h3 className="font-headline italic text-2xl font-bold text-white leading-tight">{project.title}</h3>
              <p className="font-body text-xs text-white/50 mt-1.5 leading-relaxed max-w-[260px]">{project.desc}</p>
            </div>
            <div className="text-right shrink-0">
              <span className="font-mono text-[10px] text-white/30 block mb-2 uppercase tracking-widest">{project.year}</span>
              <div className="flex flex-wrap gap-1.5 justify-end">
                {project.tech.map((t) => (
                  <span key={t} className="px-2 py-0.5 text-[9px] font-label uppercase tracking-widest border border-white/10 rounded-full text-white/50 bg-white/5">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.project-card', section)
      const bgs   = gsap.utils.toArray<HTMLElement>('.project-bg', section)

      if (cards.length < 2) return

      // ─── Cards (unchanged) ───
      gsap.set(cards, { xPercent: 100 })
      gsap.set(cards[0], { xPercent: 0 })

      // ─── Backgrounds — initial opacity state ───
      gsap.set(bgs[0], { opacity: 1 })
      if (bgs.length > 1) gsap.set(bgs.slice(1), { opacity: 0 })

      const tl = gsap.timeline()

      cards.forEach((_, i) => {
        if (i === cards.length - 1) return

        // Layer 1 — cards (exactly as before)
        tl.to(cards[i],     { xPercent: -100, duration: 1, ease: 'none' }, i)
        tl.to(cards[i + 1], { xPercent: 0,    duration: 1, ease: 'none' }, i)

        // Layer 2 — backgrounds crossfade centered at mid-transition
        tl.to(bgs[i],     { opacity: 0, duration: 0.4, ease: 'none' }, i + 0.3)
        tl.to(bgs[i + 1], { opacity: 1, duration: 0.4, ease: 'none' }, i + 0.3)
      })

      ScrollTrigger.create({
        trigger: section,
        pin: true,
        pinSpacing: true,
        start: 'top top',
        end: () => `+=${(projects.length - 1) * window.innerHeight}`,
        scrub: 1.2,
        animation: tl,
        invalidateOnRefresh: true,
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    // No scrollSnapAlign — GSAP pin owns this zone
    <section ref={sectionRef} id="projects" className="h-screen relative overflow-hidden">

      {/* ─── Background layers — z-0, behind cards ─── */}
      {projects.map((project) => (
        <div
          key={`bg-${project.title}`}
          className="project-bg absolute inset-0 z-0"
        >
          {/* Fullscreen project image */}
          <img
            src={project.image}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />
          {/* Giant ghost title */}
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

      {/* Persistent header — always on top */}
      <div className="absolute top-0 left-0 right-0 px-10 pt-14 z-30 flex items-center justify-between pointer-events-none">
        <span className="font-label text-[10px] font-bold tracking-[0.3em] text-white/25 uppercase">
          SELECTED WORKS
        </span>
        <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest hidden md:block">
          scroll →
        </span>
      </div>

      {/* Stacked cards — each fills the section, GSAP slides between them */}
      {projects.map((project) => (
        <div
          key={project.title}
          className="project-card absolute inset-0 z-10 flex items-center justify-center"
          style={{ paddingTop: '96px', paddingBottom: '72px', paddingLeft: '24px', paddingRight: '24px' }}
        >
          <div className="mx-auto">
            <MacWindow project={project} />
          </div>
        </div>
      ))}

    </section>
  )
}
