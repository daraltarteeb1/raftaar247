import { Check } from 'lucide-react'
import { useSite } from '../context'
import { countries } from '../data'
import SectionHead from './SectionHead'
import Reveal from '../components/Reveal'

export default function Countries() {
  const { t, country, setCountry } = useSite()

  return (
    <section className="border-y border-white/10 bg-[#0a0c0f] py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <SectionHead kicker={t.countries.kicker} title={t.countries.title} sub={t.countries.sub} align="center" />

        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
          {countries.map((c, i) => {
            const active = c.code === country.code
            return (
              <Reveal key={c.code} delay={i * 60}>
                <button
                  onClick={() => setCountry(c)}
                  aria-pressed={active}
                  className={`flex h-full w-full flex-col items-center gap-2 rounded-2xl border px-4 py-6 transition-all duration-300 ${
                    active
                      ? 'amber-glow border-amber-400/60 bg-amber-400/10'
                      : 'border-white/10 bg-[#0e1013] hover:border-white/25'
                  }`}
                >
                  <span className="text-4xl">{c.flag}</span>
                  <span className={`text-sm font-bold ${active ? 'text-white' : 'text-white/75'}`}>
                    {t.countries[c.nameKey]}
                  </span>
                  <span className="text-xs text-white/40">{c.currency}</span>
                  {active && (
                    <span className="mt-1 flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#171208]">
                      <Check className="h-3 w-3" />
                      {t.countries.selected}
                    </span>
                  )}
                </button>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
