export default function Contact() {
  return (
    <section id="contact" className="py-32 bg-[#0D0D0D] text-[#F5F0E8] overflow-hidden relative">
      <div className="container mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left: headline + email + links */}
          <div className="pt-8">
            <span className="font-label text-[10px] tracking-[0.3em] uppercase text-primary-container block mb-8">
              Get in touch
            </span>
            <h2 className="font-headline text-6xl md:text-8xl font-light leading-none mb-2">Let's build</h2>
            <h2 className="font-headline italic text-6xl md:text-8xl font-bold text-primary-container leading-none mb-12">
              something.
            </h2>
            <p className="font-body text-sm text-[#F5F0E8]/50 mb-10 max-w-xs leading-relaxed">
              Currently accepting new projects and senior roles. Based in Quito, working worldwide.
            </p>
            <a
              href="mailto:jeison@christ.dev"
              className="group inline-block font-mono text-lg text-[#F5F0E8] tracking-tight transition-all duration-300 mb-10"
            >
              jeison@christ.dev
              <div className="h-px w-0 group-hover:w-full bg-primary-container transition-all duration-500 mt-1" />
            </a>
            <div className="flex gap-8 mt-6">
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
          <div className="bg-white/5 p-10 rounded-3xl backdrop-blur-sm">
            <form className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label className="font-label text-[10px] uppercase tracking-widest opacity-40">Your Name</label>
                <input
                  type="text"
                  placeholder="Type here..."
                  className="bg-transparent border-b border-[#F5F0E8]/20 py-4 focus:outline-none focus:border-[#C5FF4A] transition-colors font-headline text-2xl placeholder:text-[#F5F0E8]/20 text-[#F5F0E8]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label text-[10px] uppercase tracking-widest opacity-40">Your Email</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="bg-transparent border-b border-[#F5F0E8]/20 py-4 focus:outline-none focus:border-[#C5FF4A] transition-colors font-body text-base placeholder:text-[#F5F0E8]/20 text-[#F5F0E8]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label text-[10px] uppercase tracking-widest opacity-40">The Message</label>
                <textarea
                  rows={4}
                  placeholder="How can I help?"
                  className="bg-transparent border-b border-[#F5F0E8]/20 py-4 focus:outline-none focus:border-[#C5FF4A] transition-colors font-body text-base placeholder:text-[#F5F0E8]/20 text-[#F5F0E8] resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-container text-on-primary-container font-label text-xs font-bold tracking-[0.2em] uppercase py-5 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 mt-2"
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
