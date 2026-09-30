import { Search, Car, Store, Building2, Wrench, BadgeCheck } from 'lucide-react'
import { useSite } from '../context'
import { countries } from '../data'

const MAKES = ['Toyota', 'Nissan', 'Lexus', 'Mercedes-Benz', 'BMW', 'Porsche', 'Land Rover', 'Tesla']

export default function Hero() {
  const { t, country } = useSite()

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Background image + overlays */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07080a]/85 via-[#07080a]/55 to-[#07080a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(7,8,10,0.55)_100%)]" />
      </div>

      {/* Speed lines */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {[18, 38, 62, 82].map((top, i) => (
          <div
            key={top}
            className="speedline absolute h-px w-40 bg-gradient-to-r from-transparent via-amber-400/70 to-transparent"
            style={{ top: `${top}%`, animationDelay: `${i * 1.4}s` }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-4 pb-16 pt-32 sm:px-6 md:pt-36 lg:px-10">
        {/* Badge */}
        <div className="mb-6 flex">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold tracking-wide text-amber-300">
            <BadgeCheck className="h-4 w-4" />
            {t.hero.badge}
          </span>
        </div>

        {/* Massive display title */}
        <h1 className="font-display select-none uppercase leading-[0.86]">
          <span className="block text-[clamp(3.4rem,12.5vw,11rem)] text-white">{t.hero.titleA}</span>
          <span className="block text-[clamp(3.4rem,12.5vw,11rem)] text-gold-grad">{t.hero.titleB}</span>
        </h1>

        <p className="text-balance mt-6 max-w-xl text-[15px] leading-relaxed text-white/70 md:text-[17px]">
          {t.hero.sub}
        </p>

        {/* Search bar */}
        <form
          className="glass mt-10 grid w-full max-w-4xl grid-cols-2 gap-2 rounded-2xl p-2 sm:grid-cols-3 md:grid-cols-6 md:rounded-full md:p-2.5"
          onSubmit={(e) => e.preventDefault()}
          aria-label={t.hero.searchBtn}
        >
          {[
            { label: t.hero.searchMake, options: MAKES },
            { label: t.hero.searchModel, options: ['—'] },
            { label: t.hero.searchCountry, options: countries.map((c) => `${c.flag} ${c.code}`) },
            { label: t.hero.searchCity, options: ['—'] },
            { label: t.hero.searchPrice, options: ['—'] },
          ].map((f) => (
            <label
              key={f.label}
              className="flex h-12 flex-col justify-center rounded-xl bg-white/5 px-4 md:h-14 md:rounded-full"
            >
              <span className="text-[10px] font-semibold uppercase tracking-widest text-white/45">{f.label}</span>
              <select className="w-full cursor-pointer appearance-none bg-transparent text-sm font-semibold text-white outline-none [&>option]:bg-[#101318]">
                {f.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
          ))}
          <button
            type="submit"
            className="amber-glow col-span-2 flex h-12 items-center justify-center gap-2 rounded-xl bg-amber-400 text-sm font-bold text-[#171208] transition-colors hover:bg-amber-300 sm:col-span-3 md:col-span-1 md:h-14 md:rounded-full"
          >
            <Search className="h-4 w-4" />
            <span className="md:hidden lg:inline">{t.hero.searchBtn}</span>
            <span className="hidden md:inline lg:hidden">{t.hero.searchBtn.split(' ')[0]}</span>
          </button>
        </form>

        {/* Quick actions */}
        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          {[
            { href: '/dashboard', label: t.hero.sell, icon: Car, primary: true },
            { href: '#cars', label: t.hero.findCars, icon: Search },
            { href: '#accounts', label: t.hero.findDealers, icon: Building2 },
            { href: '#accounts', label: t.hero.findShowrooms, icon: Store },
            { href: '#garages', label: t.hero.findGarages, icon: Wrench },
          ].map((b) => (
            <a
              key={b.label}
              href={b.href}
              className={`flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-all ${
                b.primary
                  ? 'bg-white text-[#101318] hover:bg-amber-300'
                  : 'border border-white/20 bg-white/5 text-white/85 backdrop-blur hover:border-amber-400/50 hover:text-white'
              }`}
            >
              <b.icon className="h-4 w-4" />
              {b.label}
            </a>
          ))}
        </div>

        {/* Stats strip */}
        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-3 lg:grid-cols-6">
          {[
            ['6', t.stats.countries],
            ['4', t.stats.accountTypes],
            ['1,000', t.stats.founding],
            ['EN / ع', t.stats.bilingual],
            ['25+', t.stats.makes],
            ['~3', t.stats.listingTime],
          ].map(([num, label]) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd className="font-display text-2xl text-white md:text-[28px]">{num}</dd>
              <dd className="mt-1 text-xs font-medium uppercase tracking-wider text-white/45">{label}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 text-xs text-white/40">
          {country.flag} {t.countries[country.nameKey]} · {country.currency}
        </p>
      </div>
    </section>
  )
}
