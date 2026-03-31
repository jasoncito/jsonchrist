import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Editorial from './components/Editorial'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

// Background colour transitions as each section scrolls into view.
// The fixed canvas element sits behind every section; sections are transparent.
const TRANSITIONS = [
  { trigger: '#about',    from: '#F2EDE4', to: '#1C2B1A' }, // cream  → olive
  { trigger: '#projects', from: '#1C2B1A', to: '#111111' }, // olive  → near-black
  { trigger: '#contact',  from: '#111111', to: '#0D0D0D' }, // near-black → pure black
  { trigger: 'footer',    from: '#0D0D0D', to: '#F2EDE4' }, // black  → cream
]

export default function App() {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Start at cream (hero colour)
    canvas.style.backgroundColor = '#F2EDE4'

    const triggers = TRANSITIONS.map(({ trigger, from, to }) =>
      ScrollTrigger.create({
        trigger,
        // Wider window + longer scrub = colours bleed in gracefully
        start: 'top 90%',
        end: 'top 10%',
        scrub: 2,          // 2-second lag → very smooth
        onUpdate: (self) => {
          canvas.style.backgroundColor = gsap.utils.interpolate(
            from,
            to,
            self.progress
          ) as string
        },
      })
    )

    return () => triggers.forEach((t) => t.kill())
  }, [])

  return (
    <>
      {/* Full-page colour canvas — sits behind all transparent sections */}
      <div
        ref={canvasRef}
        className="fixed inset-0 -z-10 transition-none"
        style={{ backgroundColor: '#F2EDE4' }}
      />
      <Navbar />
      <Hero />
      <Editorial />
      <Projects />
      <Contact />
      <Footer />
    </>
  )
}
