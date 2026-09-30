import { useSite } from '../context'
import { fmtPrice, prices } from '../data'
import SectionHead from './SectionHead'
import Reveal from '../components/Reveal'

export default function Pricing() {
  const { t, country } = useSite()

  const plans = [
    { name: t.pricing.freeListings, price: '0', unit: '', desc: t.pricing.freeListingsD, popular: false },
    { name: t.pricing.privateSell, price: fmtPrice(prices.privateSell, country), unit: t.pricing.perListing, desc: t.pricing.privateSellD, popular: false },
    { name: t.pricing.renew, price: fmtPrice(prices.renew, country), unit: t.pricing.perListing, desc: t.pricing.renewD, popular: false },
    { name: t.pricing.dealer, price: fmtPrice(prices.dealer, country), unit: t.pricing.perMonth, desc: t.pricing.dealerD, popular: true },
    { name: t.pricing.showroomA, price: fmtPrice(prices.showroomA, country), unit: t.pricing.perMonth, desc: t.pricing.showroomAD, popular: false },
    { name: t.pricing.showroomB, price: fmtPrice(prices.showroomB, country), unit: t.pricing.perMonth, desc: t.pricing.showroomBD, popular: false },
    { name: t.pricing.garage, price: fmtPrice(prices.garage, country), unit: t.pricing.perMonth, desc: t.pricing.garageD, popular: false },
    { name: t.pricing.gold, price: fmtPrice(prices.gold, country), unit: t.pricing.perMonth, desc: t.pricing.goldD, popular: false },
  ]

  return (
    <section id="pricing" className="scroll-mt-24 border-y border-white/10 bg-[#0a0c0f] py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <SectionHead kicker={t.pricing.kicker} title={t.pricing.title} sub={t.pricing.sub} align="center" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-5">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={(i % 4) * 70}>
              <div
                className={`lift relative flex h-full flex-col rounded-2xl border p-6 ${
                  p.popular
                    ? 'border-amber-400/50 bg-gradient-to-b from-amber-400/10 to-[#0e1013]'
                    : 'border-white/10 bg-[#0e1013]'
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 start-5 rounded-full bg-amber-400 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#171208]">
                    {t.pricing.mostPopular}
                  </span>
                )}
                <h3 className="text-[15px] font-bold text-white">{p.name}</h3>
                <p className="mt-4">
                  <span className="font-display text-[30px] text-white">{p.price}</span>
                  {p.unit && <span className="ms-1 text-sm text-white/45">{p.unit}</span>}
                </p>
                <p className="mt-3 flex-1 text-[13px] leading-relaxed text-white/55">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-white/40">{t.pricing.note}</p>
        </Reveal>
      </div>
    </section>
  )
}
