import { ArrowRight, ArrowLeft, BookOpen } from 'lucide-react'
import { useSite } from '../context'
import SectionHead from './SectionHead'
import Reveal from '../components/Reveal'

export default function Guides() {
  const { t, lang } = useSite()
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight

  const guides = [
    { title: t.guides.g1t, desc: t.guides.g1d, n: '01' },
    { title: t.guides.g2t, desc: t.guides.g2d, n: '02' },
    { title: t.guides.g3t, desc: t.guides.g3d, n: '03' },
  ]

  return (
    <section id="guides" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <SectionHead kicker={t.guides.kicker} title={t.guides.title} sub={t.guides.sub} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {guides.map((g, i) => (
            <Reveal key={g.n} delay={i * 90}>
              <a
                href="#guides"
                className="lift group flex h-full flex-col rounded-2xl border border-white/10 bg-[#0e1013] p-6 md:p-7"
              >
                <div className="mb-6 flex items-center justify-between">
                  <BookOpen className="h-5 w-5 text-amber-400" />
                  <span className="font-display text-sm text-white/25">{g.n}</span>
                </div>
                <h3 className="text-balance text-[17px] font-bold leading-snug text-white transition-colors group-hover:text-amber-300">
                  {g.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-white/55">{g.desc}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber-400">
                  {t.guides.read}
                  <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
