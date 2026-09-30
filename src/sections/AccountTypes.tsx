import { User, Building2, Store, Wrench, Check } from 'lucide-react'
import { useSite } from '../context'
import SectionHead from './SectionHead'
import Reveal from '../components/Reveal'

export default function AccountTypes() {
  const { t } = useSite()

  const cards = [
    {
      icon: User,
      name: t.accounts.private.name,
      tag: t.accounts.private.tag,
      features: [
        t.accounts.private.f1,
        t.accounts.private.f2,
        t.accounts.private.f3,
        t.accounts.private.f4,
        t.accounts.private.f5,
      ],
      wide: true,
    },
    {
      icon: Building2,
      name: t.accounts.dealer.name,
      tag: t.accounts.dealer.tag,
      features: [t.accounts.dealer.f1, t.accounts.dealer.f2, t.accounts.dealer.f3, t.accounts.dealer.f4, t.accounts.dealer.f5],
      wide: true,
    },
    {
      icon: Store,
      name: t.accounts.showroom.name,
      tag: t.accounts.showroom.tag,
      features: [
        t.accounts.showroom.f1,
        t.accounts.showroom.f2,
        t.accounts.showroom.f3,
        t.accounts.showroom.f4,
        t.accounts.showroom.f5,
      ],
      wide: false,
    },
    {
      icon: Wrench,
      name: t.accounts.garage.name,
      tag: t.accounts.garage.tag,
      features: [t.accounts.garage.f1, t.accounts.garage.f2, t.accounts.garage.f3, t.accounts.garage.f4, t.accounts.garage.f5],
      wide: false,
    },
  ]

  return (
    <section id="accounts" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <SectionHead kicker={t.accounts.kicker} title={t.accounts.title} sub={t.accounts.sub} />

        {/* Asymmetric bento: two large + two standard */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {cards.map((c, i) => (
            <Reveal key={c.name} delay={i * 80}>
              <div
                className={`lift group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0e1013] p-6 md:p-8 ${
                  c.wide ? '' : ''
                }`}
              >
                <div
                  className="pointer-events-none absolute -end-16 -top-16 h-48 w-48 rounded-full bg-amber-400/5 blur-2xl transition-all duration-500 group-hover:bg-amber-400/10"
                  aria-hidden="true"
                />
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-400/10">
                    <c.icon className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl uppercase text-white">{c.name}</h3>
                    <p className="text-[13px] text-white/50">{c.tag}</p>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {c.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#pricing"
                  className="mt-6 inline-flex h-11 items-center rounded-full border border-white/15 px-5 text-sm font-semibold text-white/85 transition-colors hover:border-amber-400/60 hover:text-amber-300"
                >
                  {t.accounts.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
