import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Editorial() {
  const sectionRef = useRef<HTMLElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const wideRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = [portraitRef.current, centerRef.current, rightRef.current]
      els.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
          }
        )
      })

      gsap.fromTo(
        wideRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wideRef.current,
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-32 bg-[#1C2B1E] text-[#F5F0E8] relative overflow-hidden topo-texture"
    >
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          {/* Portrait Left */}
          <div ref={portraitRef} className="md:col-span-4 aspect-[3/4] overflow-hidden rounded-lg opacity-0">
            <img
              className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-700"
              alt="Black and white portrait of developer Jeison Christ"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCf43jZOsXLqqaBMcSuoBWZF-19g0UJ2PciSInCaX2znGDfaU7LzN5GeTcwhQvfC69RK8EXXmw4-G-N3v1zwGZNVWH-CxeIaMemcGS7I7gP9rg73Zm52yskm9HObaUSiWZlN2OsbnQjV5KYOgOV4_tzwdZrlBenoP1Oc22UeWqKxYX3FxFRQGHpw_tuZmu_4qHayfFLCCJYepnhz9p_13ZuDVIZEcAvzR4IhjZymW1N9FFrEjE1CyeefJDlQka_bt3rv4rUSsziM9M"
            />
          </div>

          {/* Center Quote & Info */}
          <div ref={centerRef} className="md:col-span-5 flex flex-col items-center text-center py-12 opacity-0">
            <div className="mb-12">
              <p className="font-headline italic text-4xl md:text-6xl mb-6">"I build things I'd actually use."</p>
              <div className="h-16 w-48 mx-auto text-primary-container">
                <svg className="w-full h-full fill-none stroke-current stroke-2" viewBox="0 0 200 60">
                  <path d="M20 40c20-10 40-30 60-10s20 30 50 10 30-20 50 0" strokeLinecap="round" />
                  <text
                    className="font-headline italic text-xl fill-current stroke-none"
                    style={{ fontFamily: 'Newsreader' }}
                    x="40"
                    y="50"
                  >
                    Jeison Christ
                  </text>
                </svg>
              </div>
            </div>
            <div className="font-mono text-xs tracking-[0.3em] uppercase opacity-60">
              6 yrs · 15+ apps
            </div>
          </div>

          {/* Right Square Grid */}
          <div ref={rightRef} className="md:col-span-3 grid grid-cols-1 gap-8 opacity-0">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                className="w-full h-full object-cover grayscale opacity-50"
                alt="Close up of high-end clean code on a monitor"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6EWMg81CoIUhxKheCx_OlhMwEqUse6zl4nNi1c8zEKs9jv4mZQpcBM41fQILpo8khNQbSK3_mRF_JRIxDg4CakzvdbjxyGPVsffDQxqIi4QbczCmVhwhW5OsWN-UF026Y-WN0_MMts6OTMC-Jy4wq8lRVkmCsxOakpWyGdhD6DmHioZ0M5TH2P5XGV8GgJrpGZs191y8j06XnFXO79MFhTo-q569a1MmXB-ZFjesosj4lAHuDmMXXoE_Q6rDunIl-tmHiV7SVDTg"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                className="w-full h-full object-cover grayscale opacity-50"
                alt="Modern mobile app UI design on a dark background"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyB1sA_UJ6tmRVg5LCFVIfj3LbNYaNfAwgSAexZ1cIrRxxtQye0RBzhjRx-o6kc5wgbEE5zr7ItAyZyytcgC6wcvKff6-YbeOQKuN2_5V9_n5RCKW8jMPGqmdP0Ep2DvtwRZrfHYINZ2D4-iaUvXcq45fkVZAngF3Ie7oI6mipqjqSZd087Ycmeqow6MgJ0YgCMV0DdJan3luSwmutuMNLPLy4zl-GSK_pbcYlTgqJw0uYl04kd2fpYaoK0IBYYHdZ6qOm8u3ZOqo"
              />
            </div>
          </div>

          {/* Wide Landscape Bottom */}
          <div ref={wideRef} className="md:col-span-8 md:col-start-3 mt-8 aspect-[21/9] overflow-hidden rounded-lg opacity-0">
            <img
              className="w-full h-full object-cover grayscale brightness-50"
              alt="Minimalist high-end workspace landscape"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZLHs8KrZ-VT9WzGlneE3lRJYYG9Es2ttE6pfSvxdOvo2YDH-Y3uGyEqA__Zq7Egg8XNdQ1E8Jz3LYOjenqq0PbR3gxWphzwk7NgmE_pu9cn6RgParNC_jphWcOg_rrZHgdBGff2kBUY8sgS18X4W6jW96eD9g4KurDyUAk1eCEUslvR5TG1BFjazJj-EnR3Y00IbeVMern0A7T-7r-dl64cJwOG6bnhMWqR6FsPZZZtAjEBOlVAqKOVQb8dBUsegXBl8mDYh2i6w"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
