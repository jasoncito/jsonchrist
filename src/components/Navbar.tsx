import { useEffect, useState } from 'react'

type Theme = 'transparent' | 'dark'

export default function Navbar() {
  const [theme, setTheme] = useState<Theme>('transparent')

  useEffect(() => {
    const update = () => {
      const about = document.getElementById('about')
      if (!about) {
        setTheme('transparent')
        return
      }
      // getBoundingClientRect reflects actual rendered position,
      // works correctly with sticky/fixed elements.
      // When #about's top reaches the navbar (~80px), switch to dark.
      const rect = about.getBoundingClientRect()
      setTheme(rect.top <= 80 ? 'dark' : 'transparent')
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  const isDark = theme === 'dark'
  const bg = isDark ? '#0a0a0a' : 'transparent'
  const textColor = isDark ? '#F5F0E8' : '#0D0D0D'
  const subTextColor = isDark ? 'rgba(245,240,232,0.5)' : 'rgba(13,13,13,0.6)'
  const borderColor = isDark ? 'rgba(245,240,232,0.15)' : 'rgba(13,13,13,0.15)'

  return (
    <nav
      className="fixed top-0 w-full z-50 transition-colors duration-300"
      style={{ backgroundColor: bg, borderBottom: `1px solid ${borderColor}` }}
    >
      <div className="relative flex items-center px-8 py-6 w-full mx-auto">
        <div
          className="text-xl font-bold tracking-tighter font-headline italic transition-colors duration-300"
          style={{ color: textColor }}
        >
          JEISON CHRIST
        </div>
        <a
          href="#hero"
          className="absolute left-1/2 transform -translate-x-1/2 font-label text-xs tracking-widest uppercase font-bold border-b-2 border-[#c8f135] transition-all duration-200"
          style={{ color: textColor }}
        >
          JC
        </a>
        <div className="ml-auto hidden md:flex gap-12 items-center">
          <a
            href="#projects"
            className="font-label text-xs tracking-widest uppercase hover:scale-105 transition-all duration-300"
            style={{ color: subTextColor }}
          >
            Works
          </a>
          <a
            href="#about"
            className="font-label text-xs tracking-widest uppercase hover:scale-105 transition-all duration-300"
            style={{ color: subTextColor }}
          >
            About
          </a>
          <a
            href="#contact"
            className="px-6 py-2 bg-[#c8f135] text-[#0D0D0D] rounded-full font-label text-xs tracking-widest font-bold hover:scale-105 active:scale-95 transition-all duration-200"
          >
            HIRE ME
          </a>
        </div>
        <div className="md:hidden ml-auto">
          <span className="material-symbols-outlined text-2xl" style={{ color: textColor }}>menu</span>
        </div>
      </div>
    </nav>
  )
}
