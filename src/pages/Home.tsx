import { useEffect, useMemo, useState } from 'react'
import { SiteContext } from '../context'
import { translations, type Lang } from '../i18n'
import { countries, type Country } from '../data'
import Navbar from '../sections/Navbar'
import Hero from '../sections/Hero'
import Marquee from '../sections/Marquee'
import FeaturedCars from '../sections/FeaturedCars'
import HowItWorks from '../sections/HowItWorks'
import AccountTypes from '../sections/AccountTypes'
import Pricing from '../sections/Pricing'
import Founding from '../sections/Founding'
import Referral from '../sections/Referral'
import GarageOffers from '../sections/GarageOffers'
import Countries from '../sections/Countries'
import Guides from '../sections/Guides'
import FAQ from '../sections/FAQ'
import Footer from '../sections/Footer'

export default function Home() {
  const [lang, setLang] = useState<Lang>('en')
  const [country, setCountry] = useState<Country>(countries[0])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  const ctx = useMemo(
    () => ({ lang, setLang, t: translations[lang], country, setCountry }),
    [lang, country],
  )

  return (
    <SiteContext.Provider value={ctx}>
      <div className="min-h-screen bg-[#07080a] text-white">
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <FeaturedCars />
          <HowItWorks />
          <AccountTypes />
          <Pricing />
          <Founding />
          <Referral />
          <GarageOffers />
          <Countries />
          <Guides />
          <FAQ />
        </main>
        <Footer />
      </div>
    </SiteContext.Provider>
  )
}
