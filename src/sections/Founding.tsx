import { Crown, Check, ShieldAlert } from 'lucide-react'
import { useSite } from '../context'
import Reveal from '../components/Reveal'

export default function Founding() {
  const { t } = useSite()
  const benefits = [t.founding.b1, t.founding.b2, t.founding.b3, t.founding.b4, t.founding.b5, t.founding.b6]

  return (
    <section id="founding" className="relative scroll-mt-24 overflow-hidden py-20 md:py-32">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute start-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-amber-400/10 blur-[120px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        {/* Counter visual */}
        <Reveal>
          <div className="text-center lg:text-start">
            <p className="font-display-cond mb-4 text-xs uppercase text-amber-400">{t.founding.kicker}</p>
            <div className="font-display select-none leading-[0.85]">
              <span className="block text-[clamp(5rem,16vw,12rem)] text-gold-grad">1,000</span>
              <span className="mt-2 block text-[clamp(1.6rem,4.5vw,3rem)] uppercase text-white">{t.founding.title}</span>
            </div>
            <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-white/60 lg:mx-0">{t.founding.sub}</p>
            <p className="mt-3 text-sm font-semibold text-amber-300/90">{t.founding.after}</p>
            <a
              href="/dashboard"
              className="amber-glow mt-8 inline-flex h-[52px] items-center gap-2 rounded-full bg-amber-400 px-8 py-4 text-base font-bold text-[#171208] transition-colors hover:bg-amber-300"
            >
              <Crown className="h-5 w-5" />
              {t.founding.cta}
            </a>
          </div>
        </Reveal>

        {/* Benefits card */}
        <Reveal delay={120}>
          <div className="glass rounded-3xl p-6 md:p-9">
            <h3 className="font-display mb-6 text-lg uppercase text-white">{t.founding.benefitTitle}</h3>
            <ul className="space-y-4">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 border-b border-white/5 pb-4 text-[15px] text-white/80 last:border-0 last:pb-0">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-400/15">
                    <Check className="h-3.5 w-3.5 text-amber-400" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-start gap-2 rounded-xl bg-white/5 p-4 text-xs leading-relaxed text-white/50">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-400/80" />
              {t.founding.legal}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
