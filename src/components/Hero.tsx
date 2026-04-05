import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  ready: boolean
}

export default function Hero({ ready }: Props) {
  const badgeRef      = useRef<HTMLDivElement>(null)
  const imageRef      = useRef<HTMLImageElement>(null)
  const locationRef   = useRef<HTMLDivElement>(null)
  const headline1Ref  = useRef<HTMLDivElement>(null)
  const headline2Ref  = useRef<HTMLDivElement>(null)
  const descriptorRef = useRef<HTMLDivElement>(null)
  const scrollRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {

      /* ─── ENTRANCE ─── */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl
        .fromTo(badgeRef.current,
          { opacity: 0, y: -16 },
          { opacity: 1, y: 0, duration: 0.7 })
        .fromTo(
          [headline1Ref.current, headline2Ref.current],
          { opacity: 0, y: 72, skewY: 4 },
          { opacity: 1, y: 0, skewY: 0, duration: 1.2, stagger: 0.12 },
          '-=0.35'
        )
        .fromTo(descriptorRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.7'
        )
        .fromTo(imageRef.current,
          { opacity: 0, scale: 1.06, y: 48 },
          { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: 'power2.out' },
          '-=1.1'
        )
        .fromTo(locationRef.current,
          { opacity: 0, x: 24 },
          { opacity: 1, x: 0, duration: 0.9 },
          '-=0.9'
        )
        .fromTo(scrollRef.current,
          { opacity: 0 },
          { opacity: 0.4, duration: 0.6 },
          '-=0.5'
        )

      /* ─── EXIT PARALLAX ─── */
      // Use fromTo with explicit "from" values so scrub correctly reverses
      // to the fully-visible state when scrolling back up.
      // immediateRender: false prevents overwriting the entrance animation.
      gsap.fromTo(
        [headline1Ref.current, headline2Ref.current],
        { y: 0, opacity: 1 },
        {
          y: -48, opacity: 0, ease: 'none', immediateRender: false,
          scrollTrigger: { trigger: '#hero', start: '70% top', end: 'bottom -10%', scrub: 1.2 },
        }
      )

      gsap.fromTo(
        descriptorRef.current,
        { y: 0, opacity: 1 },
        {
          y: -32, opacity: 0, ease: 'none', immediateRender: false,
          scrollTrigger: { trigger: '#hero', start: '70% top', end: 'bottom top', scrub: 1 },
        }
      )

      // Image parallax: subtle drift, stays mostly visible
      gsap.fromTo(
        imageRef.current,
        { y: 0 },
        {
          y: -30, ease: 'none', immediateRender: false,
          scrollTrigger: { trigger: '#hero', start: '50% top', end: 'bottom top', scrub: 1.8 },
        }
      )

      // Badge + location fade out (opacity differs: badge/location=1, scroll indicator=0.4)
      gsap.fromTo(
        [badgeRef.current, locationRef.current],
        { opacity: 1, y: 0 },
        {
          opacity: 0, y: -16, ease: 'none', immediateRender: false,
          scrollTrigger: { trigger: '#hero', start: '60% top', end: 'bottom 20%', scrub: 0.8 },
        }
      )
      gsap.fromTo(
        scrollRef.current,
        { opacity: 0.4, y: 0 },
        {
          opacity: 0, y: -16, ease: 'none', immediateRender: false,
          scrollTrigger: { trigger: '#hero', start: '60% top', end: 'bottom 20%', scrub: 0.8 },
        }
      )
    })

    return () => ctx.revert()
  }, [ready])

  return (
    <header
      id="hero"
      className="relative h-screen topo-texture"
      style={{ position: 'sticky', top: 0, overflow: 'hidden' }}
    >
      {/* Available badge */}
      <div
        ref={badgeRef}
        className="absolute top-28 left-8 z-30 inline-flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/20 px-4 py-2 rounded-full opacity-0"
      >
        <span className="w-2 h-2 rounded-full bg-[#c8f135] shadow-[0_0_8px_#c8f135]" />
        <span className="font-label text-[10px] tracking-[0.2em] uppercase font-medium">
          AVAILABLE FOR WORK
        </span>
      </div>

      {/* Split layout */}
      <div className="h-full flex">
        {/* Left — headline */}
        <div className="flex-1 min-w-0 flex flex-col justify-center pl-10 lg:pl-16 pt-20 z-10 pointer-events-none select-none">
          <div
            ref={headline1Ref}
            className="font-headline font-black text-[clamp(2rem,4.5vw,4.5rem)] leading-none tracking-tight text-[#111111] opacity-0"
          >
            I BUILD PRODUCTS
          </div>
          <div
            ref={headline2Ref}
            className="font-headline font-black italic text-[clamp(2rem,4.5vw,4.5rem)] leading-none tracking-tight opacity-0"
            style={{ WebkitTextStroke: '2px #547400', color: 'transparent' }}
          >
            PEOPLE LOVE.
          </div>
          <div
            ref={descriptorRef}
            className="mt-6 font-body text-sm tracking-[0.18em] uppercase text-[#111111]/40 opacity-0"
          >
            Full-stack engineer · React · Node · AWS · 6 years
          </div>
        </div>

        {/* Right — figure */}
        <div className="hidden md:flex w-[45%] lg:w-[42%] items-end justify-center z-20 pointer-events-none overflow-hidden">
          <img
            ref={imageRef}
            src="/jeison.png"
            alt="Jeison Christ"
            className="h-[88vh] w-auto max-w-none opacity-0"
            style={{ objectFit: 'contain', objectPosition: 'bottom center' }}
          />
        </div>
      </div>

      {/* Location tag */}
      <div
        ref={locationRef}
        className="absolute bottom-10 right-10 z-30 hidden lg:flex flex-col items-end gap-1 opacity-0"
      >
        <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#111111]/35">
          Based in
        </div>
        <div className="font-headline italic text-4xl font-bold text-[#111111]/12 leading-none">
          QUITO<br />ECUADOR
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 md:left-1/4 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-0"
      >
        <div className="w-px h-12 bg-[#111111]/30 animate-pulse" />
        <span className="font-mono text-[9px] tracking-widest uppercase text-[#111111]/40">scroll</span>
      </div>

      {/* Bottom fade — suaviza transición hacia Editorial (olive #1C2B1A) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-40"
        style={{ background: 'linear-gradient(to bottom, transparent, #1C2B1A)' }}
      />
    </header>
  )
}
