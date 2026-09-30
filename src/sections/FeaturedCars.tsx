import { useState } from 'react'
import { Heart, BadgeCheck, MapPin, Gauge } from 'lucide-react'
import { useSite } from '../context'
import { cars, fmtPrice } from '../data'
import SectionHead from './SectionHead'
import Reveal from '../components/Reveal'

export default function FeaturedCars() {
  const { t, lang, country } = useSite()
  const [liked, setLiked] = useState<Record<string, boolean>>({})

  return (
    <section id="cars" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <SectionHead kicker={t.cars.kicker} title={t.cars.title} sub={t.cars.sub} />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car, i) => (
            <Reveal key={car.id} delay={(i % 3) * 90}>
              <article className="lift group overflow-hidden rounded-2xl border border-white/10 bg-[#0e1013]">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={car.img}
                    alt={`${car.title} ${car.year}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <div className="absolute start-3 top-3 flex gap-2">
                    {car.sponsored && (
                      <span className="rounded-full bg-amber-400 px-2.5 py-1 text-[11px] font-bold text-[#171208]">
                        {t.cars.sponsored}
                      </span>
                    )}
                    {car.verified && (
                      <span className="glass flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold text-sky-300">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        {t.cars.verified}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setLiked((s) => ({ ...s, [car.id]: !s[car.id] }))}
                    aria-label={t.cars.like}
                    aria-pressed={!!liked[car.id]}
                    className="glass absolute end-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:text-amber-400"
                  >
                    <Heart
                      className={`h-5 w-5 transition-all ${
                        liked[car.id] ? 'fill-amber-400 text-amber-400 scale-110' : ''
                      }`}
                    />
                  </button>
                  <span className="font-display absolute bottom-3 start-4 text-xl text-white drop-shadow-lg">
                    {fmtPrice(car.priceAed, country)}
                  </span>
                </div>

                <div className="p-4 md:p-5">
                  <h3 className="text-[17px] font-bold text-white">{car.title}</h3>
                  <p className="mt-1 text-sm text-white/55">
                    {car.year} · {car.seller[lang]}
                  </p>
                  <div className="mt-3 flex items-center gap-4 border-t border-white/10 pt-3 text-[13px] text-white/55">
                    <span className="flex items-center gap-1.5">
                      <Gauge className="h-4 w-4 text-amber-400/80" />
                      {car.km.toLocaleString()} {t.cars.km}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-amber-400/80" />
                      {car.city[lang]}
                    </span>
                    <span className="ms-auto flex items-center gap-1 text-white/40">
                      <Heart className="h-3.5 w-3.5" />
                      {car.likes + (liked[car.id] ? 1 : 0)}
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <p className="text-xs leading-relaxed text-white/40">{t.cars.note}</p>
        </Reveal>
      </div>
    </section>
  )
}
