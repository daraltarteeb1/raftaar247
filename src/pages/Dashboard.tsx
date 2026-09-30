import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import {
  Car, Crown, Wallet, Plus, Pause, Play, Trash2, LogOut, Loader2,
  CreditCard, CheckCircle2, AlertTriangle, ArrowLeft, Share2, Copy, Check,
} from 'lucide-react'
import { trpc } from '@/providers/trpc'
import { useAuth } from '@/hooks/useAuth'
import { LOGIN_PATH } from '@/const'

const MAKES = ['Toyota', 'Nissan', 'Lexus', 'Mercedes-Benz', 'BMW', 'Porsche', 'Land Rover', 'Audi', 'Ford', 'Honda', 'Hyundai', 'Kia', 'Tesla']

export default function Dashboard() {
  const { user, isLoading: authLoading, logout } = useAuth({
    redirectOnUnauthenticated: true,
    redirectPath: LOGIN_PATH,
  })
  const [params, setParams] = useSearchParams()
  const utils = trpc.useUtils()
  const { data, isLoading } = trpc.marketplace.dashboard.useQuery(undefined, {
    enabled: !!user,
  })

  const createListing = trpc.marketplace.createListing.useMutation({
    onSuccess: () => {
      utils.marketplace.dashboard.invalidate()
      setFormOpen(false)
      setForm({ title: '', make: 'Toyota', model: '', year: 2023, priceAed: 50000, city: '' })
    },
  })
  const setStatus = trpc.marketplace.setListingStatus.useMutation({
    onSuccess: () => utils.marketplace.dashboard.invalidate(),
  })
  const buyCredit = trpc.marketplace.buyListingCredit.useMutation({
    onSuccess: (r) => {
      window.location.href = r.checkoutUrl
    },
  })
  const confirmPayment = trpc.marketplace.confirmPayment.useMutation({
    onSuccess: () => {
      utils.marketplace.dashboard.invalidate()
      setPaidFlash(true)
      setParams({}, { replace: true })
    },
    onError: () => setParams({}, { replace: true }),
  })

  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState({ title: '', make: 'Toyota', model: '', year: 2023, priceAed: 50000, city: '' })
  const [paidFlash, setPaidFlash] = useState(false)
  const [copied, setCopied] = useState(false)

  // Returning from Stripe Checkout
  const sessionId = params.get('session_id')
  useEffect(() => {
    if (sessionId && user) confirmPayment.mutate({ sessionId })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, user])

  const wallet = data?.wallet
  const credits = (wallet?.freeCredits ?? 0) + (wallet?.paidCredits ?? 0)
  const noCredits = data ? credits === 0 : false
  const noListingErr = createListing.error?.message === 'NO_CREDITS'
  const stripeMissing = buyCredit.error?.message === 'STRIPE_NOT_CONFIGURED'

  const activeListings = useMemo(
    () => (data?.listings ?? []).filter((l) => l.status !== 'deleted'),
    [data],
  )

  if (authLoading || (user && isLoading)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07080a]">
        <Loader2 className="h-8 w-8 animate-spin text-amber-400" />
      </div>
    )
  }
  if (!user) return null

  return (
    <div className="min-h-screen bg-[#07080a] text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07080a]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-4 px-4 sm:px-6">
          <Link to="/" className="flex items-baseline gap-1">
            <span className="font-display text-xl uppercase text-white">Raftaar</span>
            <span className="font-display text-xl text-gold-grad">247</span>
          </Link>
          <span className="hidden text-sm text-white/40 sm:inline">Dashboard</span>
          <div className="ms-auto flex items-center gap-3">
            <span className="hidden max-w-[180px] truncate text-sm text-white/60 sm:inline">{user.name || user.email}</span>
            <button
              onClick={logout}
              className="flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-medium text-white/80 transition-colors hover:border-white/30"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 md:py-12">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to marketplace
        </Link>

        {paidFlash && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-4 text-sm text-emerald-300">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            Payment confirmed — 1 listing credit added to your account.
          </div>
        )}
        {params.get('canceled') && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-4 text-sm text-white/70">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-400" />
            Checkout was canceled — no charge was made.
          </div>
        )}

        {/* Stat cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#0e1013] p-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/45">
              <Wallet className="h-4 w-4 text-amber-400" /> Listing credits
            </div>
            <p className="font-display mt-3 text-4xl text-white">{credits}</p>
            <p className="mt-1 text-xs text-white/45">
              {wallet?.freeCredits ?? 0} free · {wallet?.paidCredits ?? 0} paid
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0e1013] p-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/45">
              <Crown className="h-4 w-4 text-amber-400" /> Founding Member
            </div>
            {wallet?.foundingNumber ? (
              <>
                <p className="font-display mt-3 text-4xl text-gold-grad">#{wallet.foundingNumber}</p>
                <p className="mt-1 text-xs text-white/45">of the first 1,000 — lifetime status</p>
              </>
            ) : (
              <>
                <p className="font-display mt-3 text-2xl text-white/60">Standard member</p>
                <p className="mt-1 text-xs text-white/45">The Founding 1,000 program is full</p>
              </>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0e1013] p-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/45">
              <Share2 className="h-4 w-4 text-amber-400" /> Referral code
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
              <p className="font-display truncate text-2xl text-amber-300">{wallet?.referralCode}</p>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(
                    `${window.location.origin}/?ref=${wallet?.referralCode}`,
                  )
                  setCopied(true)
                  setTimeout(() => setCopied(false), 1500)
                }}
                className="flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-white/8 px-3 text-xs font-semibold hover:bg-white/15"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy link'}
              </button>
            </div>
            <p className="mt-1 text-xs text-white/45">Share it — rewards follow the published program</p>
          </div>
        </div>

        {/* Paywall when out of credits */}
        {(noCredits || noListingErr) && (
          <div className="mt-6 rounded-2xl border border-amber-400/40 bg-gradient-to-b from-amber-400/10 to-[#0e1013] p-6 md:p-8">
            <h2 className="font-display text-xl uppercase text-white">You're out of free listings</h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/60">
              Your 5 free listings are used up. Buy a listing credit to keep selling — {data?.listingPriceAed ?? 100} AED
              per listing, active for 15 days. Secure checkout by Stripe.
            </p>
            <button
              onClick={() => buyCredit.mutate()}
              disabled={buyCredit.isPending}
              className="amber-glow mt-5 flex h-12 items-center gap-2 rounded-full bg-amber-400 px-6 text-sm font-bold text-[#171208] transition-colors hover:bg-amber-300 disabled:opacity-60"
            >
              {buyCredit.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
              Buy listing credit — {data?.listingPriceAed ?? 100} AED
            </button>
            {stripeMissing && (
              <p className="mt-3 text-xs text-amber-300/80">
                Payments aren't switched on yet — the site owner still needs to add the Stripe key.
              </p>
            )}
          </div>
        )}

        {/* Listings */}
        <div className="mt-10 flex items-center justify-between">
          <h2 className="font-display text-xl uppercase text-white">My Listings</h2>
          <button
            onClick={() => setFormOpen((v) => !v)}
            className="flex h-11 items-center gap-2 rounded-full bg-amber-400 px-5 text-sm font-bold text-[#171208] transition-colors hover:bg-amber-300"
          >
            <Plus className="h-4 w-4" />
            New listing
          </button>
        </div>

        {formOpen && (
          <form
            className="mt-4 grid grid-cols-1 gap-3 rounded-2xl border border-white/10 bg-[#0e1013] p-5 sm:grid-cols-2 lg:grid-cols-3"
            onSubmit={(e) => {
              e.preventDefault()
              createListing.mutate({
                ...form,
                title: form.title || `${form.make} ${form.model} ${form.year}`,
                city: form.city || undefined,
              })
            }}
          >
            <input
              required
              placeholder="Title (e.g. Nissan Patrol LE Platinum)"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-sm outline-none placeholder:text-white/35 focus:border-amber-400/60 sm:col-span-2 lg:col-span-3"
            />
            <select
              value={form.make}
              onChange={(e) => setForm({ ...form, make: e.target.value })}
              className="h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-sm outline-none [&>option]:bg-[#101318]"
            >
              {MAKES.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
            <input
              required
              placeholder="Model"
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
              className="h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-sm outline-none placeholder:text-white/35 focus:border-amber-400/60"
            />
            <input
              required
              type="number"
              min={1950}
              max={new Date().getFullYear() + 1}
              value={form.year}
              onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
              className="h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-sm outline-none focus:border-amber-400/60"
            />
            <input
              required
              type="number"
              min={0}
              placeholder="Price (AED)"
              value={form.priceAed}
              onChange={(e) => setForm({ ...form, priceAed: Number(e.target.value) })}
              className="h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-sm outline-none placeholder:text-white/35 focus:border-amber-400/60"
            />
            <input
              placeholder="City (optional)"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-sm outline-none placeholder:text-white/35 focus:border-amber-400/60"
            />
            <button
              type="submit"
              disabled={createListing.isPending}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-amber-400 text-sm font-bold text-[#171208] transition-colors hover:bg-amber-300 disabled:opacity-60"
            >
              {createListing.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Car className="h-4 w-4" />}
              Publish ({credits > 0 ? `uses 1 ${wallet?.freeCredits ? 'free' : 'paid'} credit` : 'no credits'})
            </button>
            {createListing.error && !noListingErr && (
              <p className="text-xs text-red-400 sm:col-span-2 lg:col-span-3">{createListing.error.message}</p>
            )}
          </form>
        )}

        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
          {activeListings.length === 0 ? (
            <div className="bg-[#0e1013] p-10 text-center text-sm text-white/45">
              No listings yet — publish your first car with a free credit.
            </div>
          ) : (
            <ul className="divide-y divide-white/8">
              {activeListings.map((l) => (
                <li key={l.id} className="flex flex-col gap-3 bg-[#0e1013] p-4 sm:flex-row sm:items-center sm:gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-semibold text-white">{l.title}</p>
                    <p className="mt-0.5 text-xs text-white/45">
                      {l.make} {l.model} · {l.year} · {l.priceAed.toLocaleString()} AED{l.city ? ` · ${l.city}` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase ${
                        l.status === 'active' ? 'bg-emerald-400/15 text-emerald-300' : 'bg-white/10 text-white/50'
                      }`}
                    >
                      {l.status}
                    </span>
                    <span className="rounded-full bg-amber-400/12 px-2.5 py-1 text-[11px] font-bold uppercase text-amber-300">
                      {l.creditType}
                    </span>
                    <button
                      onClick={() => setStatus.mutate({ listingId: l.id, status: l.status === 'active' ? 'paused' : 'active' })}
                      aria-label={l.status === 'active' ? 'Pause' : 'Activate'}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/70 hover:border-white/30"
                    >
                      {l.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => setStatus.mutate({ listingId: l.id, status: 'deleted' })}
                      aria-label="Delete"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/70 hover:border-red-400/50 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Orders */}
        {(data?.orders.length ?? 0) > 0 && (
          <>
            <h2 className="font-display mt-10 text-xl uppercase text-white">Payments</h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
              <ul className="divide-y divide-white/8">
                {data!.orders.map((o) => (
                  <li key={o.id} className="flex items-center justify-between gap-4 bg-[#0e1013] p-4 text-sm">
                    <div>
                      <p className="font-medium text-white">{o.product}</p>
                      <p className="text-xs text-white/40">{new Date(o.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-white/80">{o.amountAed} {o.currency}</span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase ${
                          o.status === 'paid'
                            ? 'bg-emerald-400/15 text-emerald-300'
                            : o.status === 'pending'
                              ? 'bg-amber-400/15 text-amber-300'
                              : 'bg-red-400/15 text-red-300'
                        }`}
                      >
                        {o.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
