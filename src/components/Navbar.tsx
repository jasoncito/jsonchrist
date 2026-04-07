import { useEffect, useState } from 'react'

type Theme = 'transparent' | 'dark'

export default function Navbar() {
  const [theme, setTheme] = useState<Theme>('transparent')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const update = () => {
      const about = document.getElementById('about')
      if (!about) {
        setTheme('transparent')
        return
      }
      const rect = about.getBoundingClientRect()
      setTheme(rect.top <= 80 ? 'dark' : 'transparent')
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  // Lock body scroll when mobile menu is open (preserve overflow-x:hidden)
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = ''
    }
    return () => { document.body.style.overflowY = '' }
  }, [menuOpen])

  const isDark = theme === 'dark'
  const bg = isDark ? '#0a0a0a' : 'transparent'
  const textColor = isDark ? '#F5F0E8' : '#0D0D0D'
  const subTextColor = isDark ? 'rgba(245,240,232,0.5)' : 'rgba(13,13,13,0.6)'
  const borderColor = isDark ? 'rgba(245,240,232,0.15)' : 'rgba(13,13,13,0.15)'

  return (
    <>
      {/* Nav bar — always on top (z-[70]) */}
      <nav
        className="fixed top-0 w-full z-[70] transition-colors duration-300"
        style={{ backgroundColor: menuOpen ? 'transparent' : bg, borderBottom: menuOpen ? 'none' : `1px solid ${borderColor}` }}
      >
        <div className="relative flex items-center px-6 md:px-8 py-5 md:py-6 w-full mx-auto">
          <div
            className="text-xl font-bold tracking-tighter font-headline italic transition-colors duration-300"
            style={{ color: menuOpen ? '#F5F0E8' : textColor }}
          >
            JEISON CHRIST
          </div>

          {/* Centered JC mark — hidden when menu is open */}
          {!menuOpen && (
            <a
              href="#hero"
              className="absolute left-1/2 transform -translate-x-1/2 font-label text-xs tracking-widest uppercase font-bold border-b-2 border-[#c8f135] transition-all duration-200"
              style={{ color: textColor }}
            >
              JC
            </a>
          )}

          {/* Desktop links */}
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
              LET'S TALK
            </a>
          </div>

          {/* Hamburger / close — 44px touch target */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden ml-auto flex items-center justify-center w-11 h-11 -mr-2 rounded-lg"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={{ color: menuOpen ? '#F5F0E8' : textColor }}
            >
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay — z-[60] (below nav so nav button stays on top) */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-all duration-300 ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: '#0D0D0D' }}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col justify-center items-start gap-8 h-full px-8 pb-16 pt-24">
          <a
            href="#about"
            onClick={() => setMenuOpen(false)}
            className="font-headline italic text-5xl font-bold text-[#F5F0E8] leading-none py-3 active:opacity-60"
          >
            About
          </a>
          <a
            href="#projects"
            onClick={() => setMenuOpen(false)}
            className="font-headline italic text-5xl font-bold text-[#F5F0E8] leading-none py-3 active:opacity-60"
          >
            Works
          </a>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="font-headline italic text-5xl font-bold text-[#F5F0E8] leading-none py-3 active:opacity-60"
          >
            Contact
          </a>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-6 inline-block px-8 py-4 bg-[#c8f135] text-[#0D0D0D] rounded-full font-label text-sm tracking-widest font-bold active:scale-95 transition-all duration-200"
          >
            LET'S TALK
          </a>
        </div>
      </div>
    </>
  )
}
