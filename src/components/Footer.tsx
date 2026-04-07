import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef    = useRef<HTMLElement>(null)
  const copyrightRef = useRef<HTMLDivElement>(null)
  const locationRef  = useRef<HTMLDivElement>(null)
  const linksRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [copyrightRef.current, locationRef.current, linksRef.current],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="w-full py-12 px-8 bg-[#F2EDE4]">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto font-label text-xs tracking-[0.2em] uppercase text-[#0D0D0D]">
        <div ref={copyrightRef} className="text-[#0D0D0D]/40 opacity-0">Jeison Christ © 2025</div>
        <div ref={locationRef} className="hidden md:flex gap-8 opacity-0">
          <span className="text-[#0D0D0D]">Quito, Ecuador</span>
        </div>
        <div ref={linksRef} className="flex gap-2 opacity-0">
          <a href="#" className="hover:text-[#c8f135] transition-colors py-2 px-2">LinkedIn</a>
          <a href="#" className="hover:text-[#c8f135] transition-colors py-2 px-2">Github</a>
        </div>
      </div>
    </footer>
  )
}
