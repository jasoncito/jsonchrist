export default function Footer() {
  return (
    <footer className="w-full py-12 px-8 bg-[#EDE7DE]">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto font-label text-xs tracking-[0.2em] uppercase text-[#0D0D0D]">
        <div className="text-[#0D0D0D]/40">Jeison Christ © 2025</div>
        <div className="hidden md:flex gap-8">
          <span className="text-[#0D0D0D]">Quito, Ecuador</span>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-[#C5FF4A] transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-[#C5FF4A] transition-colors">Github</a>
        </div>
      </div>
    </footer>
  )
}
