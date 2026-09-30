import Reveal from '../components/Reveal'

export default function SectionHead({
  kicker,
  title,
  sub,
  align = 'start',
}: {
  kicker: string
  title: string
  sub?: string
  align?: 'start' | 'center'
}) {
  return (
    <Reveal className={`mb-10 md:mb-14 ${align === 'center' ? 'text-center' : ''}`}>
      <p className="font-display-cond mb-3 text-xs uppercase text-amber-400">{kicker}</p>
      <h2 className="font-display text-balance text-3xl uppercase leading-[1.02] text-white sm:text-4xl md:text-[44px]">
        {title}
      </h2>
      {sub && (
        <p className={`mt-4 max-w-2xl text-[15px] leading-relaxed text-white/60 ${align === 'center' ? 'mx-auto' : ''}`}>
          {sub}
        </p>
      )}
    </Reveal>
  )
}
