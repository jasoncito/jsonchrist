export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#F5F0E8]/70 backdrop-blur-xl shadow-[0px_20px_40px_rgba(13,13,13,0.05)]">
      <div className="relative flex items-center px-8 py-6 w-full mx-auto">
        <div className="text-xl font-bold tracking-tighter text-[#0D0D0D] font-headline italic">
          JEISON CHRIST
        </div>
        <a
          href="#about"
          className="absolute left-1/2 transform -translate-x-1/2 font-label text-xs tracking-widest uppercase text-[#0D0D0D] font-bold border-b-2 border-[#C5FF4A] transition-all duration-200"
        >
          JC
        </a>
        <div className="ml-auto hidden md:flex gap-12 items-center">
          <a
            href="#projects"
            className="font-label text-xs tracking-widest uppercase text-[#0D0D0D]/60 hover:scale-105 transition-transform duration-300 hover:text-[#0D0D0D]"
          >
            Works
          </a>
          <a
            href="#about"
            className="font-label text-xs tracking-widest uppercase text-[#0D0D0D]/60 hover:scale-105 transition-transform duration-300 hover:text-[#0D0D0D]"
          >
            About
          </a>
          <a
            href="#contact"
            className="px-6 py-2 bg-primary-container text-on-primary-container rounded-full font-label text-xs tracking-widest font-bold hover:scale-105 active:scale-95 transition-all duration-200"
          >
            HIRE ME
          </a>
        </div>
        <div className="md:hidden ml-auto">
          <span className="material-symbols-outlined text-2xl">menu</span>
        </div>
      </div>
    </nav>
  )
}
