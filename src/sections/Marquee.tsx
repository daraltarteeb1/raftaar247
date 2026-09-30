import { brands } from '../data'

export default function Marquee() {
  const row = [...brands, ...brands]
  return (
    <section aria-hidden="true" className="border-y border-white/10 bg-[#0a0c0f] py-5">
      <div className="marquee-mask overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-10 pe-10">
          {row.map((b, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="font-display-cond whitespace-nowrap text-sm uppercase text-white/40 transition-colors hover:text-amber-400">
                {b}
              </span>
              <span className="h-1 w-1 rounded-full bg-amber-400/50" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
