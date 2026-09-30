import { Car, Search } from 'lucide-react'
import { useSite } from '../context'
import Reveal from '../components/Reveal'

export default function Footer() {
  const { t, lang } = useSite()

  const cols = [
    {
      title: t.footer.marketplace,
      links: [t.footer.sellCar, t.footer.findCars, t.footer.dealers, t.footer.showrooms, t.footer.garages, t.footer.pricing],
      hrefs: ['#pricing', '#cars', '#accounts', '#accounts', '#garages', '#pricing'],
    },
    {
      title: t.footer.company,
      links: [t.footer.about, t.footer.contact, t.footer.founding, t.footer.referral, t.footer.franchise, t.footer.guides],
      hrefs: ['#top', '#top', '#founding', '#referral', '#founding', '#guides'],
    },
    {
      title: t.footer.legal,
      links: [
        t.footer.privacy,
        t.footer.terms,
        t.footer.cookies,
        t.footer.refund,
        t.footer.rules,
        t.footer.listingPolicy,
        t.footer.referralTerms,
        t.footer.foundingTerms,
        t.footer.aiDisclosure,
        t.footer.adDisclosure,
      ],
      hrefs: Array(10).fill('#legal'),
    },
  ]

  return (
    <footer id="legal" className="border-t border-white/10 bg-[#050608]">
      {/* CTA band */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:py-24 lg:px-10">
          <Reveal className="text-center">
            <h2 className="font-display text-balance text-4xl uppercase leading-none text-white sm:text-5xl md:text-6xl">
              {t.cta.title.split('?')[0]}
              <span className="text-gold-grad">?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">{t.cta.sub}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#pricing"
                className="amber-glow flex h-[52px] items-center gap-2 rounded-full bg-amber-400 px-8 py-4 text-base font-bold text-[#171208] transition-colors hover:bg-amber-300"
              >
                <Car className="h-5 w-5" />
                {t.cta.sell}
              </a>
              <a
                href="#cars"
                className="flex h-[52px] items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-white transition-colors hover:border-amber-400/60 hover:text-amber-300"
              >
                <Search className="h-5 w-5" />
                {t.cta.explore}
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            {/* Wordmark — LOGO SLOT for footer as well */}
            <a href="#top" className="flex items-baseline gap-1">
              <span className="font-display text-2xl uppercase text-white">Raftaar</span>
              <span className="font-display text-2xl text-gold-grad">247</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">{t.footer.tagline}</p>
            <p className="mt-4 text-sm text-white/40">{t.footer.madeFor}</p>
          </div>
          {cols.map((col) => (
            <div key={col.title} className="md:col-span-2 lg:col-span-2 first:md:col-span-2">
              <h3 className="font-display-cond mb-4 text-xs uppercase text-amber-400">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l, i) => (
                  <li key={l}>
                    <a href={col.hrefs[i]} className="text-sm text-white/60 transition-colors hover:text-white">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Marketplace disclaimer */}
        <p className="mt-12 rounded-xl border border-white/10 bg-white/5 p-5 text-xs leading-relaxed text-white/40">
          {t.footer.disclaimer}
        </p>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Raftaar247. {t.footer.rights}</p>
          <p dir={lang === 'ar' ? 'rtl' : 'ltr'}>raftaar247.com</p>
        </div>
      </div>
    </footer>
  )
}
