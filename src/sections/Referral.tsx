import { useState } from 'react'
import { Copy, Check, Share2, Wallet, Users, History, MessageCircle, Send, Facebook, Instagram, MessageSquare } from 'lucide-react'
import { useSite } from '../context'
import { fmtPrice, prices } from '../data'
import SectionHead from './SectionHead'
import Reveal from '../components/Reveal'

export default function Referral() {
  const { t, country } = useSite()
  const [copied, setCopied] = useState<'code' | 'link' | null>(null)

  const code = 'RFT-A7K92'
  const link = 'raftaar247.com/register?ref=RFT-A7K92'

  const copy = (text: string, which: 'code' | 'link') => {
    navigator.clipboard?.writeText(text).catch(() => {})
    setCopied(which)
    setTimeout(() => setCopied(null), 1800)
  }

  const shareChannels = [
    { name: 'WhatsApp', icon: MessageCircle },
    { name: 'Telegram', icon: Send },
    { name: 'Facebook', icon: Facebook },
    { name: 'Instagram', icon: Instagram },
    { name: 'SMS', icon: MessageSquare },
  ]

  return (
    <section id="referral" className="scroll-mt-24 border-y border-white/10 bg-[#0a0c0f] py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <SectionHead kicker={t.referral.kicker} title={t.referral.title} sub={t.referral.sub} />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
          {/* Code card */}
          <Reveal className="lg:col-span-3">
            <div className="lift h-full rounded-2xl border border-white/10 bg-[#0e1013] p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/45">{t.referral.codeLabel}</p>
              <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-dashed border-amber-400/40 bg-amber-400/5 px-5 py-4">
                <span className="font-display text-2xl tracking-wider text-amber-300 md:text-3xl">{code}</span>
                <button
                  onClick={() => copy(code, 'code')}
                  className="flex h-11 items-center gap-2 rounded-full bg-white/10 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                >
                  {copied === 'code' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  {copied === 'code' ? t.referral.copied : t.referral.copy}
                </button>
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-white/45">{t.referral.linkLabel}</p>
              <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4">
                <span className="truncate text-sm text-white/75" dir="ltr">
                  {link}
                </span>
                <button
                  onClick={() => copy(link, 'link')}
                  className="flex h-11 shrink-0 items-center gap-2 rounded-full bg-white/10 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                >
                  {copied === 'link' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  {copied === 'link' ? t.referral.copied : t.referral.copy}
                </button>
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-white/45">{t.referral.share}</p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {shareChannels.map((s) => (
                  <button
                    key={s.name}
                    className="flex h-11 items-center gap-2 rounded-full border border-white/10 px-4 text-sm font-medium text-white/80 transition-colors hover:border-amber-400/50 hover:text-amber-300"
                  >
                    <s.icon className="h-4 w-4" />
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Dashboard preview */}
          <Reveal delay={120} className="lg:col-span-2">
            <div className="lift flex h-full flex-col rounded-2xl border border-white/10 bg-[#0e1013] p-6 md:p-8">
              <h3 className="font-display mb-6 flex items-center gap-2 text-base uppercase text-white">
                <Share2 className="h-4 w-4 text-amber-400" />
                {t.referral.kicker}
              </h3>
              <ul className="flex-1 space-y-4">
                {[
                  { icon: Users, text: t.referral.d1 },
                  { icon: Wallet, text: t.referral.d2 },
                  { icon: History, text: t.referral.d3 },
                ].map((d) => (
                  <li key={d.text} className="flex items-start gap-3 text-sm text-white/70">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-400/10">
                      <d.icon className="h-3.5 w-3.5 text-amber-400" />
                    </span>
                    {d.text}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl bg-white/5 p-4 text-center">
                <p className="text-xs uppercase tracking-widest text-white/45">{t.referral.min}</p>
                <p className="font-display mt-1 text-2xl text-white">{fmtPrice(prices.minWithdrawal, country)}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-8">
          <p className="text-xs leading-relaxed text-white/40">{t.referral.legal}</p>
        </Reveal>
      </div>
    </section>
  )
}
