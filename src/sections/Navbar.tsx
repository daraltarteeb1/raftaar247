import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Menu, X, ChevronDown, Globe, UserCircle2, LayoutDashboard } from 'lucide-react'
import { useSite } from '../context'
import { countries } from '../data'
import { useAuth } from '@/hooks/useAuth'

export default function Navbar() {
  const { t, lang, setLang, country, setCountry } = useSite()
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [countryOpen, setCountryOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const links = [
    { href: '#cars', label: t.nav.cars },
    { href: '#accounts', label: `${t.nav.dealers} & ${t.nav.showrooms}` },
    { href: '#garages', label: t.nav.garages },
    { href: '#pricing', label: t.nav.pricing },
    { href: '#founding', label: t.nav.founding },
    { href: '#referral', label: t.nav.referral },
    { href: '#guides', label: t.nav.guides },
    { href: '#faq', label: t.nav.faq },
  ]

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#07080acc]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)]'
            : 'bg-gradient-to-b from-black/70 to-transparent border-b border-transparent'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <nav className="mx-auto flex h-16 md:h-[76px] max-w-[1440px] items-center gap-3 px-4 sm:px-6 lg:px-10">
          {/* Wordmark — LOGO SLOT: replace this text block with <img src="/logo.png" /> when your logo is ready */}
          <a href="#top" className="flex shrink-0 items-baseline gap-1 select-none" aria-label="Raftaar247 home">
            <span className="font-display text-[19px] sm:text-[22px] md:text-[26px] uppercase leading-none text-white">
              Raftaar
            </span>
            <span className="font-display text-[19px] sm:text-[22px] md:text-[26px] leading-none text-gold-grad">247</span>
          </a>

          {/* Desktop menu — big, clear, always visible */}
          <ul className="mx-auto hidden items-center gap-0.5 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="nav-link whitespace-nowrap rounded-md px-2.5 py-2 text-[14px] font-semibold text-white/85 transition-colors hover:text-white xl:px-3 xl:text-[15px]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="ms-auto flex items-center gap-1.5 sm:gap-2 lg:ms-0">
            {/* Country selector */}
            <div className="relative">
              <button
                onClick={() => setCountryOpen((v) => !v)}
                className="flex h-10 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 text-sm font-medium text-white/90 transition-colors hover:border-white/30 sm:px-3"
                aria-haspopup="listbox"
                aria-expanded={countryOpen}
              >
                <span className="text-base leading-none">{country.flag}</span>
                <span className="hidden sm:inline">{country.code}</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </button>
              {countryOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setCountryOpen(false)} />
                  <ul
                    role="listbox"
                    className="absolute end-0 z-20 mt-2 w-60 overflow-hidden rounded-xl border border-white/10 bg-[#101318] p-1.5 shadow-2xl"
                  >
                    {countries.map((c) => (
                      <li key={c.code}>
                        <button
                          role="option"
                          aria-selected={c.code === country.code}
                          onClick={() => {
                            setCountry(c)
                            setCountryOpen(false)
                          }}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-white/10 ${
                            c.code === country.code ? 'bg-white/10 text-white' : 'text-white/75'
                          }`}
                        >
                          <span className="text-lg">{c.flag}</span>
                          <span className="flex-1 text-start font-medium">{t.countries[c.nameKey]}</span>
                          <span className="text-xs text-white/50">{c.currency}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="flex h-10 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 text-[13px] font-semibold text-white/90 transition-colors hover:border-white/30 sm:px-3.5 sm:text-sm"
            >
              <Globe className="hidden h-4 w-4 text-amber-400 sm:block" />
              {lang === 'en' ? 'العربية' : 'EN'}
            </button>

            {/* CTA */}
            <a
              href="#pricing"
              className="amber-glow hidden h-10 shrink-0 items-center whitespace-nowrap rounded-full bg-amber-400 px-5 text-sm font-bold text-[#171208] transition-all hover:bg-amber-300 2xl:flex"
            >
              {t.nav.sellCar}
            </a>

            {/* Sign in / Dashboard */}
            {isAuthenticated ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="hidden h-10 items-center gap-2 rounded-full border border-amber-400/50 bg-amber-400/10 px-4 text-sm font-semibold text-amber-300 transition-colors hover:bg-amber-400/20 lg:flex"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className="max-w-[120px] truncate">{user?.name || 'Dashboard'}</span>
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="hidden h-10 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-sm font-semibold text-white/90 transition-colors hover:border-white/30 lg:flex"
              >
                <UserCircle2 className="h-4 w-4 text-amber-400" />
                {t.nav.signIn}
              </button>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white lg:hidden"
              aria-label={t.nav.menu}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-[#07080a] transition-all duration-300 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.menu}
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <span className="flex items-baseline gap-1">
            <span className="font-display text-[22px] uppercase text-white">Raftaar</span>
            <span className="font-display text-[22px] text-gold-grad">247</span>
          </span>
          <button
            onClick={() => setOpen(false)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white"
            aria-label={t.nav.close}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
          <ul className="flex flex-col divide-y divide-white/10">
            {links.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display flex min-h-[56px] items-center justify-between py-3 text-[26px] uppercase text-white/90 transition-colors hover:text-amber-400"
                  style={{ transitionDelay: `${i * 20}ms` }}
                >
                  {l.label}
                  <span className="text-amber-400/70 text-lg">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-3 px-4 pb-6 sm:px-6">
          <button
            onClick={() => {
              setOpen(false)
              navigate(isAuthenticated ? '/dashboard' : '/login')
            }}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-white/20 text-base font-semibold text-white"
          >
            {isAuthenticated ? <LayoutDashboard className="h-5 w-5" /> : <UserCircle2 className="h-5 w-5" />}
            {isAuthenticated ? 'Dashboard' : t.nav.signIn}
          </button>
          <a
            href="#pricing"
            onClick={() => setOpen(false)}
            className="flex h-14 w-full items-center justify-center rounded-2xl bg-amber-400 text-base font-bold text-[#171208]"
          >
            {t.nav.sellCar}
          </a>
        </div>
      </div>
    </>
  )
}
