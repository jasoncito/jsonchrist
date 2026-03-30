import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'Lumina Pay',
    year: '2024',
    tech: ['React Native', 'Node.js'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbP_S78aiosF80xs3whOa8KeHP_N_AeCGavKOjvMLaf1MYQuJTqeB7UrkvyAdz3t7VY_OQAlT2ktA3XbHn0jN4DKpq2zQQ4FaiSJS0YwmZdXJMHePVupZt8rcXEhmeg0lyHq99bGp4MIc0NBXpuyKM0BRgLgzgzmkGCUMBq1wspGwrC0ENtXtrOWPBcVgLdIVrkML5sptTeaO0CeQkZLEsG1dyg6IGn-h8Mhhz0Q_CvTJpA9FbWE8HNXu1aF1lqRmWx6kVxBM1raY',
    alt: 'Mobile banking app user interface visualization',
  },
  {
    title: 'Atlas CRM',
    year: '2023',
    tech: ['Next.js', 'Typescript'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgtIFAN910W8E96H2cfWvu1Kh99uL2hCquAlAk-2xpazMIGq9UHITbV1vB59US1yvlRb6n6DqtcebInQ5GAk1b0TYHvSea88bzIR67Yd4d_1Nzm87uQP3m2U6Pyi4bqCxy7gQ8LSI1_dZxYmKDWpPvD_ZGsdOX-kdNdCbX7OSzFd5akERbZ1YVRrOvZeOTTWFd5iM2FTqVBbFPv3VK6UthkXovn0IUORSTJ__e9YFRpBw1-mFujN4D8hvjYua1xVbn-dhP6c0GlYs',
    alt: 'E-commerce web dashboard interface',
  },
  {
    title: 'Verve Analytics',
    year: '2023',
    tech: ['AWS', 'React'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvP8jQ_mprbvNK1_s7C3hxYzH9WFNVJxGnx-D3DSkXO_rcwA5RHV6GPn5wXV2u15EpbBPDzq57plRX7xvlYi8Vu6WGw6uGou5tweeeAQwCISFInOOdrrYrZJRACfQGZGJNSd4oaNSRqhBFXwrzBpl17I8eamV-d7IgDPxAXVKnkg7isG_MOvRbgGSlZpUzxztaTpYVfwjksgoXX2AQaDGF1vMa856TLRxMfpIuXPG555THRfhv4Lu-vAdM--E4aXIzpagjZAAsKIg',
    alt: 'Data visualization analytics platform',
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          },
        }
      )

      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="py-32 bg-[#F5F0E8]">
      <div className="container mx-auto px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-24 opacity-0">
          <span className="font-label text-xs font-bold tracking-[0.3em] text-on-primary-container uppercase block mb-4">
            SELECTED WORKS
          </span>
          <h2 className="font-headline text-6xl md:text-8xl font-medium tracking-tight">
            What I've Built.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {projects.map((project, i) => (
            <div
              key={project.title}
              ref={(el) => { cardsRef.current[i] = el }}
              className="group relative flex flex-col gap-6 opacity-0"
            >
              <div className="aspect-[16/9] bg-surface-container-highest rounded-lg overflow-hidden outline outline-0 group-hover:outline-1 outline-[#C5FF4A] transition-all duration-300 shadow-sm group-hover:shadow-xl group-hover:-translate-y-2">
                <img
                  className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform duration-700"
                  alt={project.alt}
                  src={project.image}
                />
              </div>
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline text-3xl italic font-bold">{project.title}</h3>
                  <span className="font-mono text-[10px] opacity-40 uppercase">{project.year}</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 bg-surface-container text-[10px] font-label font-bold uppercase tracking-widest rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
