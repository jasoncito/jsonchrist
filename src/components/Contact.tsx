import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef  = useRef<HTMLElement>(null)
  const labelRef    = useRef<HTMLSpanElement>(null)
  const line1Ref    = useRef<HTMLHeadingElement>(null)
  const line2Ref    = useRef<HTMLHeadingElement>(null)
  const bodyRef     = useRef<HTMLParagraphElement>(null)
  const emailRef    = useRef<HTMLAnchorElement>(null)
  const linksRef    = useRef<HTMLDivElement>(null)
  const formRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current

      /* ─── ENTRANCE ─── */
      // Left side: label → line1 → line2 → body → email → links
      const leftItems = [
        labelRef.current,
        line1Ref.current,
        line2Ref.current,
        bodyRef.current,
        emailRef.current,
        linksRef.current,
      ]

      gsap.fromTo(
        leftItems,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 72%' },
        }
      )

      // Right side: form panel slides in from right
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 72%' },
        }
      )

      // Form fields stagger up inside the panel
      gsap.fromTo(
        '.contact-field',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          delay: 0.5,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 72%' },
        }
      )

      /* ─── EXIT ─── */
      gsap.to(
        [labelRef.current, line1Ref.current, line2Ref.current, bodyRef.current, emailRef.current, linksRef.current],
        {
          opacity: 0,
          y: -28,
          stagger: 0.04,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: section,
            start: 'bottom 60%',
            end: 'bottom 5%',
            scrub: 1,
          },
        }
      )

      gsap.to(formRef.current, {
        opacity: 0,
        x: 40,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: section,
          start: 'bottom 65%',
          end: 'bottom 10%',
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="h-screen flex items-center text-[#F5F0E8] overflow-hidden relative"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="container mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Left: headline + email + links */}
          <div className="pt-8">
            <span ref={labelRef} className="font-label text-[10px] tracking-[0.3em] uppercase text-primary-container block mb-8 opacity-0">
              Get in touch
            </span>
            <h2 ref={line1Ref} className="font-headline text-6xl md:text-8xl font-light leading-none mb-2 opacity-0">
              Let's build
            </h2>
            <h2 ref={line2Ref} className="font-headline italic text-6xl md:text-8xl font-bold text-primary-container leading-none mb-12 opacity-0">
              something.
            </h2>
            <p ref={bodyRef} className="font-body text-sm text-[#F5F0E8]/50 mb-10 max-w-xs leading-relaxed opacity-0">
              Currently accepting new projects and senior roles. Based in Quito, working worldwide.
            </p>
            <a
              ref={emailRef}
              href="mailto:jeison@christ.dev"
              className="group inline-block font-mono text-lg text-[#F5F0E8] tracking-tight transition-all duration-300 mb-10 opacity-0"
            >
              jeison@christ.dev
              <div className="h-px w-0 group-hover:w-full bg-primary-container transition-all duration-500 mt-1" />
            </a>
            <div ref={linksRef} className="flex gap-8 mt-6 opacity-0">
              <a
                href="#"
                className="text-[#F5F0E8]/50 hover:text-primary-container transition-colors flex items-center gap-2"
              >
                <span className="font-label text-xs tracking-widest uppercase">LinkedIn</span>
                <span className="material-symbols-outlined text-sm">north_east</span>
              </a>
              <a
                href="#"
                className="text-[#F5F0E8]/50 hover:text-primary-container transition-colors flex items-center gap-2"
              >
                <span className="font-label text-xs tracking-widest uppercase">Github</span>
                <span className="material-symbols-outlined text-sm">north_east</span>
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div ref={formRef} className="bg-white/5 p-10 rounded-3xl backdrop-blur-sm opacity-0">
            <form className="flex flex-col gap-8">
              <div className="contact-field flex flex-col gap-2 opacity-0">
                <label className="font-label text-[10px] uppercase tracking-widest opacity-40">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Type here..."
                  className="bg-transparent border-b border-[#F5F0E8]/20 py-4 focus:outline-none focus:border-[#C5FF4A] transition-colors font-headline text-2xl placeholder:text-[#F5F0E8]/20 text-[#F5F0E8]"
                />
              </div>
              <div className="contact-field flex flex-col gap-2 opacity-0">
                <label className="font-label text-[10px] uppercase tracking-widest opacity-40">
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="bg-transparent border-b border-[#F5F0E8]/20 py-4 focus:outline-none focus:border-[#C5FF4A] transition-colors font-body text-base placeholder:text-[#F5F0E8]/20 text-[#F5F0E8]"
                />
              </div>
              <div className="contact-field flex flex-col gap-2 opacity-0">
                <label className="font-label text-[10px] uppercase tracking-widest opacity-40">
                  The Message
                </label>
                <textarea
                  rows={4}
                  placeholder="How can I help?"
                  className="bg-transparent border-b border-[#F5F0E8]/20 py-4 focus:outline-none focus:border-[#C5FF4A] transition-colors font-body text-base placeholder:text-[#F5F0E8]/20 text-[#F5F0E8] resize-none"
                />
              </div>
              <button
                type="submit"
                className="contact-field w-full bg-primary-container text-on-primary-container font-label text-xs font-bold tracking-[0.2em] uppercase py-5 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 mt-2 opacity-0"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Decorative background text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none overflow-hidden">
        <span className="font-headline font-black text-[40vw] leading-none select-none">JC</span>
      </div>
    </section>
  )
}
