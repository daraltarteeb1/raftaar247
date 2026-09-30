import { Camera, ClipboardCheck, Rocket, Sparkles } from 'lucide-react'
import { useSite } from '../context'
import SectionHead from './SectionHead'
import Reveal from '../components/Reveal'

export default function HowItWorks() {
  const { t } = useSite()
  const steps = [
    { icon: Camera, title: t.how.s1t, desc: t.how.s1d },
    { icon: ClipboardCheck, title: t.how.s2t, desc: t.how.s2d },
    { icon: Rocket, title: t.how.s3t, desc: t.how.s3d },
  ]

  return (
    <section className="border-y border-white/10 bg-[#0a0c0f] py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <SectionHead kicker={t.how.kicker} title={t.how.title} sub={t.how.sub} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 110}>
              <div className="lift relative h-full rounded-2xl border border-white/10 bg-[#0e1013] p-6 md:p-8">
                <span className="font-display pointer-events-none absolute -top-3 end-4 text-[88px] leading-none text-white/5 select-none">
                  0{i + 1}
                </span>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-400/10">
                  <s.icon className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="font-display mb-2.5 text-lg uppercase text-white">{s.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6">
          <p className="flex items-start gap-2 text-xs leading-relaxed text-white/40">
            <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400/70" />
            {t.how.aiNote}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
