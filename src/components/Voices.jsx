import { Quote } from 'lucide-react'
import { TESTIMONIALS } from '../data/site'
import { Chalk, GridBg, MaskLines, Reveal } from './ui'

/* each testimonial is a sticky note: paper colour, tilt, tape angle, avatar colour */
const NOTES = [
  { paper: 'bg-[#FFF5CC]', tilt: '-rotate-[2deg]', tape: '-rotate-3', avatar: 'bg-leaf-700' },
  { paper: 'bg-white', tilt: 'rotate-[1.5deg]', tape: 'rotate-2', avatar: 'bg-navy' },
  { paper: 'bg-sky-100', tilt: '-rotate-[1deg]', tape: 'rotate-3', avatar: 'bg-sun-600' },
  { paper: 'bg-[#FDE6DA]', tilt: 'rotate-[1.8deg]', tape: '-rotate-2', avatar: 'bg-blue' },
  { paper: 'bg-gold-100', tilt: '-rotate-[1.4deg]', tape: 'rotate-1', avatar: 'bg-leaf-700' },
  { paper: 'bg-white', tilt: 'rotate-[1deg]', tape: '-rotate-3', avatar: 'bg-sun-600' },
]

function NoteCard({ t, i }) {
  const n = NOTES[i % NOTES.length]
  return (
    <figure
      className={`note w-[80vw] max-w-[340px] shrink-0 snap-center transition duration-500 ease-out hover:z-[2] hover:-translate-y-1 hover:rotate-0 sm:w-auto sm:max-w-none ${n.tilt}`}
    >
      <div className={`note-paper flex h-full flex-col p-6 pt-9 sm:p-7 sm:pt-10 ${n.paper}`}>
        <span className={`tape ${n.tape}`} aria-hidden="true" />
        <Quote className="h-7 w-7 fill-leaf-700/15 text-leaf-700" strokeWidth={1.6} aria-hidden="true" />
        <blockquote className="relative mt-4 flex-1 text-[1.05rem] font-medium leading-[1.65] text-ink">{t.quote}</blockquote>
        <figcaption className="relative mt-6 flex items-center gap-3 border-t border-ink/10 pt-4">
          <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-[1.05rem] font-bold text-white ${n.avatar}`}>
            {t.initial}
          </span>
          <span>
            <span className="block text-[0.98rem] font-bold">{t.name}</span>
            <span className="block text-[0.86rem] text-ink-2">{t.meta}</span>
          </span>
        </figcaption>
      </div>
    </figure>
  )
}

export default function Voices() {
  return (
    <section id="voices" className="relative overflow-hidden bg-leaf-100 py-16 text-ink lg:py-24">
      <GridBg tone="ink" fade="edges" className="opacity-60" />
      <div className="container-x relative z-[2]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-leaf-700">What families say</p>
            <h2 className="display mt-4 text-[clamp(2rem,min(4vw,5vh),3.4rem)] text-navy">
              <MaskLines lines={['Notes from', <Chalk key="f" className="text-[1.06em] text-leaf-700">our families.</Chalk>]} />
            </h2>
          </div>
          <span className="rounded-full bg-white/70 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink-2 ring-1 ring-ink/20">
            Sample quotes · replace before launch
          </span>
        </div>
      </div>

      {/* SAMPLE testimonials: replace in src/data/site.js before launch */}
      <Reveal className="relative z-[2]">
        <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-10 pt-4 sm:mx-auto sm:grid sm:w-[min(100%-2.5rem,72rem)] sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 sm:overflow-visible sm:px-0 lg:grid-cols-3 lg:gap-x-10">
          {TESTIMONIALS.map((t, i) => (
            <NoteCard key={i} t={t} i={i} />
          ))}
        </div>
      </Reveal>
    </section>
  )
}
