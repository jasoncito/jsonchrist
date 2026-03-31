import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Editorial() {
  const sectionRef = useRef<HTMLElement>(null)
  const line1      = useRef<HTMLDivElement>(null)
  const line2      = useRef<HTMLDivElement>(null)
  const line3      = useRef<HTMLDivElement>(null)
  const infoRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current

      /* ─── ENTRANCE ─── */
      // toggleActions reverse ensures animation plays back when scrolling up
      gsap.fromTo(
        [line1.current, line2.current, line3.current],
        { y: '110%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 1.1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Info block fades + rises
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      /* ─── EXIT ─── */
      // Use fromTo with explicit "from" values so the scrub reversal
      // correctly returns to the fully-visible state on scroll-back.
      gsap.fromTo(
        [line1.current, line2.current, line3.current],
        { y: '0%', opacity: 1 },
        {
          y: '-60%',
          opacity: 0,
          stagger: 0.06,
          ease: 'power2.in',
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: '80% top',
            end: 'bottom -10%',
            scrub: 1,
          },
        }
      )

      // Info block fades out
      gsap.fromTo(
        infoRef.current,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -16,
          ease: 'power2.in',
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: '80% top',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const lineClass = 'whitespace-nowrap font-headline font-black italic leading-[0.88] tracking-tight'
  const fontSize  = 'clamp(2.2rem, 7.5vw, 7rem)'

  return (
    <section
      ref={sectionRef}
      id="about"
      className="h-screen flex items-center overflow-hidden"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="w-full max-w-[1400px] mx-auto px-10 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-16 lg:gap-24">

          {/* Left — stacked display type */}
          <div className="flex-1 min-w-0">
            <div className="overflow-hidden">
              <div ref={line1} className={`${lineClass} text-white opacity-0`} style={{ fontSize }}>
                FRONT-END
              </div>
            </div>
            <div className="overflow-hidden">
              <div ref={line2} className={`${lineClass} text-white opacity-0`} style={{ fontSize }}>
                &amp; MOBILE
              </div>
            </div>
            <div className="overflow-hidden">
              <div ref={line3} className={`${lineClass} opacity-0`} style={{ fontSize, color: '#c8f135' }}>
                ENGINEER.
              </div>
            </div>
          </div>

          {/* Right — info block */}
          <div ref={infoRef} className="shrink-0 md:w-52 lg:w-60 flex flex-row flex-wrap md:flex-col gap-x-8 gap-y-4 md:gap-6 opacity-0 md:pb-1">

            <div className="flex flex-col gap-1 min-w-[6rem]">
              <span className="font-label text-[10px] font-bold tracking-[0.28em] uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>Role</span>
              <span className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>Full-Stack / Mobile</span>
            </div>

            <div className="flex flex-col gap-1 min-w-[6rem]">
              <span className="font-label text-[10px] font-bold tracking-[0.28em] uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>Experience</span>
              <span className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>6 years</span>
            </div>

            <div className="flex flex-col gap-1 min-w-[6rem]">
              <span className="font-label text-[10px] font-bold tracking-[0.28em] uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>Stack</span>
              <span className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                React Native · TS<br />React · Node · AWS
              </span>
            </div>

            <div className="flex flex-col gap-1 min-w-[6rem]">
              <span className="font-label text-[10px] font-bold tracking-[0.28em] uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>Location</span>
              <span className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Quito, Ecuador<br />
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>Worldwide</span>
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
