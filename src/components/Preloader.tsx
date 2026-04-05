import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface Props {
  onComplete: () => void
}

export default function Preloader({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()
    const obj = { val: 0 }

    tl.to(obj, {
      val: 100,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate() {
        if (countRef.current) {
          countRef.current.textContent = String(Math.round(obj.val)).padStart(2, '0')
        }
      },
    })

    // Fire onComplete as slide begins — hero animates underneath
    tl.addLabel('exit', '+=0.1')
    tl.call(() => onComplete(), undefined, 'exit')
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power3.inOut',
    }, 'exit')

    return () => { tl.kill() }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-[#F2EDE4] flex items-center justify-center pointer-events-none"
    >
      <span
        ref={countRef}
        className="font-headline font-black leading-none text-[#111111] tabular-nums select-none"
        style={{ fontSize: 'clamp(5rem, 18vw, 14rem)' }}
      >
        00
      </span>
    </div>
  )
}
