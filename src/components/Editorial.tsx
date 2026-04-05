import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stack = [
  { category: 'MOBILE',   items: ['React Native', 'Expo', 'iOS', 'Android'] },
  { category: 'FRONTEND', items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'GSAP'] },
  { category: 'BACKEND',  items: ['Node.js', 'NestJS', 'Express', 'PostgreSQL'] },
  { category: 'CLOUD',    items: ['AWS Lambda', 'Cognito', 'CloudWatch', 'Bedrock'] },
  { category: 'TOOLS',    items: ['Figma', 'Amplitude', 'Braze', 'Sentry', 'Algolia'] },
]

interface Props {
  ready: boolean
}

export default function Editorial({ ready }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const panelRef   = useRef<HTMLDivElement>(null)
  const labelRef   = useRef<HTMLDivElement>(null)
  const nameRef    = useRef<HTMLDivElement>(null)
  const bioRef     = useRef<HTMLDivElement>(null)
  const stackRef   = useRef<HTMLDivElement>(null)
  const metaRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {}, [ready])

  const MARQUEE_TEXT = 'REACT NATIVE · TYPESCRIPT · NODE.JS · REACT · AWS · POSTGRESQL · D3.JS · GSAP · NEXT.JS · TAILWIND CSS · FIGMA · '

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative h-screen flex justify-end overflow-hidden"
      style={{ scrollSnapAlign: 'start', position: 'relative', zIndex: 2 }}
    >
      <div className="w-full h-full flex">

        {/* Left column — content over dark frosted panel */}
        <div className="w-full md:w-[55%] h-full flex items-end">
          <div ref={panelRef} className="bg-black/40 backdrop-blur-sm w-full h-full flex items-center px-10 lg:px-14 py-16">
            <div className="max-w-lg w-full">

              {/* Label */}
              <div ref={labelRef} className="mb-6">
                <span className="font-label text-[10px] font-bold tracking-[0.3em] uppercase text-white/40">
                  ABOUT
                </span>
              </div>

              {/* Name */}
              <div ref={nameRef} className="mb-5">
                <h2
                  className="font-headline italic font-black text-white leading-none"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
                >
                  Jeison Christ
                </h2>
              </div>

              {/* Bio */}
              <div ref={bioRef} className="mb-10">
                <p className="font-body text-sm leading-relaxed text-white/55 max-w-sm">
                  Full-Stack &amp; Mobile Engineer based in Quito, Ecuador. 6+ years building
                  products for startups and scale-ups across Latin America and remote
                  international teams.
                </p>
              </div>

              {/* Stack grid */}
              <div ref={stackRef} className="mb-10">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                  {stack.map(({ category, items }) => (
                    <div key={category}>
                      <span className="font-label text-[9px] font-bold tracking-[0.25em] uppercase text-white/30 block mb-2">
                        {category}
                      </span>
                      <ul className="flex flex-col gap-1">
                        {items.map(item => (
                          <li key={item} className="font-body text-xs text-white/55 leading-snug">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meta */}
              <div ref={metaRef} className="flex flex-wrap gap-8 pt-2 border-t border-white/[0.08]">
                <div className="flex flex-col gap-1">
                  <span className="font-label text-[9px] font-bold tracking-[0.25em] uppercase text-white/30">
                    Experience
                  </span>
                  <span className="font-body text-sm text-white/70">6+ years</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-label text-[9px] font-bold tracking-[0.25em] uppercase text-white/30">
                    Availability
                  </span>
                  <span className="font-body text-sm" style={{ color: '#c8f135' }}>
                    Open to remote roles
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-label text-[9px] font-bold tracking-[0.25em] uppercase text-white/30">
                    Location
                  </span>
                  <span className="font-body text-sm text-white/70">Quito, Ecuador</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right column — intentionally empty; hero image shows through */}
        <div className="hidden md:block md:w-[45%] shrink-0" />

      </div>

      {/* Scrolling marquee strip — bottom of section */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/[0.08]">
        <div className="marquee-container py-4">
          <div className="marquee-content font-label text-[10px] tracking-[0.35em] uppercase text-white/25 select-none">
            {MARQUEE_TEXT.repeat(2)}
          </div>
        </div>
      </div>
    </section>
  )
}
