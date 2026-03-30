import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Hero() {
  const badgeRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const locationRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.7 }
      )
        .fromTo(
          imageRef.current,
          { opacity: 0, scale: 1.04, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2 },
          '-=0.4'
        )
        .fromTo(
          locationRef.current,
          { opacity: 0, y: 20 },
          { opacity: 0.05, y: 0, duration: 0.8 },
          '-=0.6'
        )
    })

    return () => ctx.revert()
  }, [])

  return (
    <header className="relative min-h-screen bg-[#F5F0E8] pt-20 overflow-hidden topo-texture flex flex-col items-center">
      <div className="container mx-auto px-8 relative z-10 text-center">
        {/* Available badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/20 px-4 py-2 rounded-full mb-12 self-start md:absolute md:left-8 md:bottom-24 opacity-0"
        >
          <span className="w-2 h-2 rounded-full bg-primary-container shadow-[0_0_8px_#C5FF4A]" />
          <span className="font-label text-[10px] tracking-[0.2em] uppercase font-medium">AVAILABLE FOR WORK</span>
        </div>

        {/* Figure */}
        <div className="max-w-4xl mx-auto mb-[-4rem] md:mb-[-8rem] relative h-[calc(100vh-5rem)]">
          {/* Halo rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-on-surface/5 rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-on-surface/10 rounded-full rotate-45 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-on-surface/10 rounded-full -rotate-45 pointer-events-none" />

          <img
            ref={imageRef}
            src="/jeison.png"
            alt="Jeison Christ"
            className="absolute inset-x-0 bottom-0 z-20 h-full w-auto max-w-none mx-auto opacity-0"
          />
        </div>
      </div>

      {/* Location watermark */}
      <div className="absolute bottom-12 right-12 hidden lg:block">
        <h2
          ref={locationRef}
          className="font-headline text-8xl italic font-black text-on-surface select-none leading-none opacity-0"
        >
          QUITO<br />ECUADOR
        </h2>
      </div>
    </header>
  )
}
