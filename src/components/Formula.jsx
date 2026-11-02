import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { BookOpen, Hammer, HeartHandshake } from 'lucide-react'
import { Chalk, GridBg, MaskLines, Reveal } from './ui'

/* four colour blocks, like the logo: green page, gold page, navy base, plus a light tile */
const NUMBERS = [
  { n: '12–17', label: 'Age group we teach', tile: 'bg-leaf-700 text-white', sub: 'text-white/80', grid: 'dark' },
  { n: '06', label: 'Worlds of learning', tile: 'bg-sun text-ink', sub: 'text-ink/70', grid: 'ink' },
  { n: '03', label: 'Pillars of education', tile: 'bg-navy text-white', sub: 'text-white/75', grid: 'dark' },
  { n: '01', label: 'Visionary director', tile: 'bg-paper text-navy', sub: 'text-ink-2', grid: 'light' },
]

const PILLARS = [
  { n: '01', Icon: Hammer, title: 'Practical skills', text: 'Character built through doing: physical, ethical, intellectual and spiritual strength.', bar: 'border-leaf', chip: 'bg-leaf-100 text-leaf-700', num: 'text-leaf/15' },
  { n: '02', Icon: BookOpen, title: 'Theoretical knowledge', text: 'Understanding the why behind every concept, not just the answer at the back of the book.', bar: 'border-blue', chip: 'bg-sky-100 text-blue', num: 'text-blue/10' },
  { n: '03', Icon: HeartHandshake, title: 'Values', text: 'Discipline, self-control, respect for elders and the greater truths of life.', bar: 'border-gold', chip: 'bg-gold-100 text-sun-600', num: 'text-gold/25' },
]

const QUOTE = 'Education is not the learning of facts, but the training of the mind to think.'

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <motion.span style={{ opacity }} className="mr-[0.22em] inline-block">
      {children}
    </motion.span>
  )
}

function Manifesto() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = QUOTE.split(' ')
  return (
    <section id="manifesto" className="relative overflow-hidden bg-white py-16 lg:py-24">
      <GridBg />
      <div className="container-x relative z-[2] grid items-center gap-10 md:grid-cols-12 lg:gap-16">
        {/* Einstein portrait, taped up like a print */}
        <Reveal className="md:col-span-4">
          <figure className="relative mx-auto w-48 -rotate-2 bg-white p-2.5 pb-8 shadow-[0_2px_4px_rgb(0_0_0/.1),0_24px_40px_-20px_rgb(0_0_0/.45)] sm:w-60 md:w-full md:max-w-[300px]">
            <span className="tape rotate-3 bg-gold/45" aria-hidden="true" />
            <img src="/photos/einstein.jpg" alt="Albert Einstein" className="aspect-[4/5] w-full object-cover object-top" loading="lazy" />
          </figure>
        </Reveal>
        <div className="md:col-span-8">
          <p className="eyebrow text-ink-2">Our philosophy</p>
          <p ref={ref} className="display mt-6 text-[clamp(1.60rem,min(3.6vw,4.6vh),3.3rem)] text-ink">
            {words.map((w, i) =>
              reduce ? (
                <span key={i} className="mr-[0.22em] inline-block">{w}</span>
              ) : (
                <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                  {w === 'think.' ? <Chalk className="text-[1.06em] text-leaf-700">think.</Chalk> : w}
                </Word>
              ),
            )}
          </p>
          <Reveal className="mt-7 flex items-center gap-4 text-[0.85rem] font-semibold uppercase tracking-[0.2em] text-muted">
            <span className="h-px w-12 bg-ink/30" /> Albert Einstein
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default function Formula() {
  return (
    <>
      {/* numbers band */}
      <section id="numbers" className="grid grid-cols-2 lg:grid-cols-4">
        {NUMBERS.map(({ n, label, tile, sub, grid }, i) => (
          <div key={label} className={`relative overflow-hidden ${tile}`}>
            <GridBg tone={grid} fade="none" className="opacity-50" />
            <Reveal delay={i * 0.08} className="relative px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
              <p className="display text-[clamp(2rem,min(4.35vw,5.44vh),3.43rem)]">{n}</p>
              <p className={`mt-2 text-[0.92rem] font-semibold ${sub}`}>{label}</p>
            </Reveal>
          </div>
        ))}
      </section>

      <Manifesto />

      {/* the formula */}
      <section id="formula" className="relative overflow-hidden bg-night py-16 text-white lg:py-24">
        <GridBg tone="dark" />
        <div className="container-x relative">
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow text-sun">The formula</p>
              <h2 className="display mt-4 text-[clamp(1.73rem,min(4.35vw,5.44vh),3.96rem)]">
                <MaskLines lines={['Education', <span key="e" className="serif-i text-sun">equals…</span>]} />
              </h2>
            </div>
            <Reveal delay={0.1} className="lg:col-span-5">
              <p className="max-w-md text-[1.05rem] leading-[1.75] text-white/80">
                Our top goal: raising every student&apos;s self-belief, self-worth and happiness by equipping them with
                emotional-intelligence skills. It rests on three pillars.
              </p>
            </Reveal>
          </div>

          <div className="relative mt-10 grid gap-7 lg:grid-cols-3 lg:gap-6">
            {PILLARS.map(({ n, Icon, title, text, bar, chip, num }, i) => (
              <Reveal
                key={n}
                delay={i * 0.12}
                y={40}
                className={`relative flex flex-col rounded-[24px] border-t-[6px] bg-white p-7 text-ink shadow-lift lg:p-8 ${bar}`}
              >
                <span className={`display pointer-events-none absolute right-6 top-4 select-none text-[4.5rem] leading-none ${num}`} aria-hidden="true">
                  {n}
                </span>
                <span className={`grid h-12 w-12 place-items-center rounded-2xl ${chip}`}>
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <h3 className="mt-6 text-[1.3rem] font-bold tracking-[-0.02em] text-navy">{title}</h3>
                <p className="mt-2 text-[0.98rem] leading-[1.7] text-ink-2">{text}</p>
                {i < 2 && (
                  <span
                    className="absolute -bottom-[2.1rem] left-1/2 z-[3] grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full bg-gold text-xl font-bold text-navy ring-4 ring-night lg:hidden"
                    aria-hidden="true"
                  >
                    +
                  </span>
                )}
              </Reveal>
            ))}
            {[1, 2].map((k) => (
              <span
                key={k}
                className="absolute top-1/2 z-[3] hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-2xl font-bold text-navy ring-4 ring-night lg:grid"
                style={{ left: `calc(${k} * (100% - 3rem) / 3 + ${k - 0.5} * 1.5rem)` }}
                aria-hidden="true"
              >
                +
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
