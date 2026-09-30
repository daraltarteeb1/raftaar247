import { Plus } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useSite } from '../context'
import SectionHead from './SectionHead'
import Reveal from '../components/Reveal'

export default function FAQ() {
  const { t } = useSite()
  const items = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
    { q: t.faq.q5, a: t.faq.a5 },
  ]

  return (
    <section id="faq" className="scroll-mt-24 border-t border-white/10 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHead kicker={t.faq.kicker} title={t.faq.title} align="center" />

        <Reveal>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="overflow-hidden rounded-xl border border-white/10 bg-[#0e1013] px-5 data-[state=open]:border-amber-400/40"
              >
                <AccordionTrigger className="min-h-[56px] py-4 text-start text-[15px] font-semibold text-white hover:no-underline [&>svg]:hidden">
                  <span className="flex flex-1">{item.q}</span>
                  <Plus className="h-4 w-4 shrink-0 text-amber-400 transition-transform duration-300 [[data-state=open]>&]:rotate-45" />
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-white/60">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
