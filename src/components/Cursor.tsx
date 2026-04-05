import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only on pointer-precise devices (no touch)
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot  = dotRef.current!
    const ring = ringRef.current!

    document.documentElement.style.cursor = 'none'

    // Instant setter for dot — no lag
    const xDot = gsap.quickSetter(dot, 'x', 'px')
    const yDot = gsap.quickSetter(dot, 'y', 'px')

    // Smooth tweened setters for ring — trailing lag effect
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3.out' })
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3.out' })

    const DOT_HALF  = 4  // w-2 = 8px → half = 4
    const RING_HALF = 20 // w-10 = 40px → half = 20

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX - DOT_HALF)
      yDot(e.clientY - DOT_HALF)
      xRing(e.clientX - RING_HALF)
      yRing(e.clientY - RING_HALF)
    }
    window.addEventListener('mousemove', onMove)

    // Ring scale on interactive elements via event delegation
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest?.('a, button')) {
        gsap.to(ring, { scale: 1.7, duration: 0.25, ease: 'power2.out' })
      }
    }
    const onOut = (e: MouseEvent) => {
      const from = e.target as Element
      const to   = e.relatedTarget as Element | null
      if (from.closest?.('a, button') && !to?.closest?.('a, button')) {
        gsap.to(ring, { scale: 1, duration: 0.3, ease: 'power2.out' })
      }
    }
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      document.documentElement.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  return (
    <>
      {/* Dot — instant follow */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white z-[300] pointer-events-none"
        style={{ mixBlendMode: 'difference' }}
      />
      {/* Ring — trailing follow */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white z-[300] pointer-events-none"
        style={{ mixBlendMode: 'difference' }}
      />
    </>
  )
}
