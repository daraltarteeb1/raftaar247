import { createContext, useContext } from 'react'
import type { Dict, Lang } from './i18n'
import type { Country } from './data'

export interface SiteCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: Dict
  country: Country
  setCountry: (c: Country) => void
}

export const SiteContext = createContext<SiteCtx | null>(null)

export function useSite(): SiteCtx {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('SiteContext missing')
  return ctx
}
