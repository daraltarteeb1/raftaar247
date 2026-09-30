import { Phone, MessageCircle, MapPin, Heart, Plus, BadgePercent } from 'lucide-react'
import { useSite } from '../context'
import { garageOffers, fmtPrice } from '../data'
import SectionHead from './SectionHead'
import Reveal from '../components/Reveal'

export default function GarageOffers() {
  const { t, lang, country } = useSite()

  return (
    <section id="garages" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <SectionHead kicker={t.garages.kicker} title={t.garages.title} sub={t.garages.sub} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
          {garageOffers.map((g, i) => (
            <Reveal key={g.name.en} delay={i * 90}>
              <article className="lift flex h-full flex-col rounded-2xl border border-white/10 bg-[#0e1013] p-6">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <span className="flex items-center gap-1.5 rounded-full bg-amber-400/10 px-3 py-1.5 text-[12px] font-semibold text-amber-300">
                    <BadgePercent className="h-3.5 w-3.5" />
                    {t.garages.thisMonth}
                  </span>
                  <button aria-label={t.cars.like} className="flex items-center gap-1 text-white/40 transition-colors hover:text-amber-400">
                    <Heart className="h-4 w-4" />
                    <span className="text-xs">{g.likes}</span>
                  </button>
                </div>
                <h3 className="font-display text-lg uppercase text-white">{g.service[lang]}</h3>
                <p className="font-display mt-2 text-[26px] text-gold-grad">{fmtPrice(g.priceAed, country)}</p>
                <p className="mt-2 text-sm font-semibold text-white/80">{g.name[lang]}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-[13px] text-white/50">
                  <MapPin className="h-3.5 w-3.5 text-amber-400/70" />
                  {g.city[lang]}
                </p>
                <div className="mt-5 grid grid-cols-4 gap-2 border-t border-white/10 pt-4">
                  {[
                    { icon: Phone, label: t.garages.call },
                    { icon: MessageCircle, label: t.garages.whatsapp },
                    { icon: MapPin, label: t.garages.map },
                    { icon: Plus, label: t.garages.follow },
                  ].map((a) => (
                    <button
                      key={a.label}
                      className="flex h-11 flex-col items-center justify-center gap-0.5 rounded-xl bg-white/5 text-[10px] font-medium text-white/70 transition-colors hover:bg-amber-400/10 hover:text-amber-300"
                    >
                      <a.icon className="h-4 w-4" />
                      {a.label}
                    </button>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
