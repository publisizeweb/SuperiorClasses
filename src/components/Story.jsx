import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Hand, Lightbulb, Quote, Smile } from 'lucide-react'
import director from '../assets/soneeka-bagade.jpg'
import { GridBg, MaskLines, Reveal } from './ui'

const MANTRAS = ['Be original.', 'Create a space for self-expression.', 'Help students make mistakes.', 'Look beyond the present.']

const MEASURES = [
  { word: 'Creativity', text: 'Be original. Fresh ideas, bold questions and your own way of solving things.', Icon: Lightbulb, color: 'text-sun', border: 'border-sun', chip: 'bg-sun text-ink' },
  { word: 'Well-being', text: 'Happy, healthy, calm minds learn best. How students feel matters here.', Icon: Smile, color: 'text-leaf-200', border: 'border-leaf-200', chip: 'bg-leaf-200 text-leaf-900' },
  { word: 'Confidence', text: 'The courage to raise a hand, try something new, and try again.', Icon: Hand, color: 'text-white', border: 'border-white', chip: 'bg-white text-leaf-700' },
]

/* one measure: coloured top rule, icon, word that fills in on scroll, short text */
function Measure({ word, text, Icon, color, border, chip, i }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 90%', 'start 55%'] })
  const clip = useTransform(scrollYProgress, [0, 1], reduce ? ['inset(0 0% 0 0)', 'inset(0 0% 0 0)'] : ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'])
  const size = 'text-[clamp(2rem,3.2vw,2.75rem)]'
  return (
    <div ref={ref} className={`border-t-4 pt-6 ${border}`}>
      <div className="flex items-center justify-between">
        <span className={`grid h-12 w-12 place-items-center rounded-2xl ${chip}`}>
          <Icon className="h-6 w-6" strokeWidth={1.8} />
        </span>
        <span className="display text-[1.1rem] text-white/45">0{i + 1}</span>
      </div>
      <h3 className="relative mt-6">
        <span className={`display text-outline block ${size} text-white/30`}>{word}</span>
        <motion.span style={{ clipPath: clip }} className={`display absolute inset-0 block ${size} ${color}`} aria-hidden="true">
          {word}
        </motion.span>
      </h3>
      <p className="mt-3 max-w-xs text-[1rem] leading-[1.7] text-white/80">{text}</p>
    </div>
  )
}

/* her four mantras as callouts beside the photo; each points at the print's white border,
   never at her (desktop). On phones they are a simple list under the photo. */
const MANTRA_CHIPS = ['bg-leaf-700 text-white', 'bg-sun text-ink', 'bg-blue text-white', 'bg-leaf-700 text-white']

function MantraCallout({ text, i }) {
  const chip = MANTRA_CHIPS[i % MANTRA_CHIPS.length]
  return (
    <motion.div
      className="relative z-[3] lg:-ml-[7px] lg:flex lg:items-center"
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: 0.5 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* pulsing dot sitting on the print's edge */}
      <span className="relative hidden h-3.5 w-3.5 shrink-0 lg:block" aria-hidden="true">
        <span className="absolute inset-0 animate-ping rounded-full bg-leaf/50" />
        <span className={`relative block h-3.5 w-3.5 rounded-full ring-2 ring-white ${chip.split(' ')[0]}`} />
      </span>
      {/* leader line drawing out to the bubble */}
      <motion.span
        className="hidden h-0 w-6 origin-left border-t-2 border-dashed border-ink/30 lg:block xl:w-8"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.9 + i * 0.18 }}
        aria-hidden="true"
      />
      {/* bubble with a small tail pointing back at the photo */}
      <div className="relative flex flex-1 items-center gap-3 rounded-2xl bg-white px-3.5 py-3 shadow-soft ring-1 ring-line lg:gap-2.5 lg:px-3">
        <span className={`display grid h-8 w-8 shrink-0 place-items-center rounded-full text-[0.78rem] ${chip}`}>0{i + 1}</span>
        <span className="text-[0.92rem] font-bold leading-snug text-navy lg:text-[0.86rem]">{text}</span>
        <span className="absolute -left-1.5 top-1/2 hidden h-3 w-3 -translate-y-1/2 rotate-45 border-b border-l border-line bg-white lg:block" aria-hidden="true" />
      </div>
    </motion.div>
  )
}

function Director() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [70, -70])
  const photoR = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-1.5, 1])  // small tilt, so the callout dots stay on the border
  const bigX = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['8%', '-28%'])
  const ease = [0.16, 1, 0.3, 1]

  return (
    <section id="story" ref={ref} className="relative overflow-hidden bg-white py-16 lg:py-28">
      <GridBg />
      {/* huge outlined word drifting sideways as you scroll */}
      <motion.span
        style={{ x: bigX }}
        className="display text-outline pointer-events-none absolute bottom-4 left-0 hidden lg:block z-[1] select-none whitespace-nowrap text-[22vw] leading-none text-navy/[0.07] lg:bottom-6 lg:text-[15vw]"
        aria-hidden="true"
      >
        Visionary · Educator · Visionary
      </motion.span>
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-gold/20 blur-[110px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-leaf/15 blur-[110px]" aria-hidden="true" />

      <div className="container-x relative z-[2]">
        <p className="eyebrow text-ink-2">Meet the visionary</p>
        <div className="mt-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          {/* photo print + mantra callouts beside it */}
          <motion.div style={{ y: photoY }} className="relative mx-auto w-full max-w-[460px] lg:col-span-7 lg:mx-0 lg:flex lg:max-w-none lg:items-stretch">
            <motion.figure
              style={{ rotate: photoR }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
              className="relative z-[2] bg-white p-3 pb-16 lg:w-[66%] lg:max-w-[450px] lg:shrink-0 lg:self-center shadow-[0_2px_4px_rgb(0_0_0/.08),0_40px_60px_-30px_rgb(0_0_0/.45)]"
            >
              <span className="tape -rotate-3 bg-gold/45" aria-hidden="true" />
              {/* photo wipes up into the frame; triggered by the figure, since a fully clipped box never "enters" view */}
              <motion.div
                className="overflow-hidden"
                variants={{ hidden: { clipPath: 'inset(100% 0% 0% 0%)' }, show: { clipPath: 'inset(0% 0% 0% 0%)' } }}
                transition={{ duration: 1.2, ease }}
              >
                <motion.img
                  src={director}
                  alt="Soneeka Bagade, Director of Superior Classes, teaching in a classroom"
                  className="aspect-square w-full object-cover object-top"
                  variants={{ hidden: { scale: 1.25 }, show: { scale: 1 } }}
                  transition={{ duration: 1.6, ease }}
                  loading="lazy"
                />
              </motion.div>
              {/* name on the print's bottom margin, with an underline that draws itself */}
              <figcaption className="absolute inset-x-0 bottom-3 px-5">
                <p className="display text-[1.35rem] text-navy lg:text-[1.2rem] xl:text-[1.35rem]">Soneeka Bagade</p>
                <p className="whitespace-nowrap text-[0.74rem] font-bold uppercase tracking-[0.18em] text-sun-600 lg:text-[0.64rem] lg:tracking-[0.12em] xl:text-[0.72rem]">Director · Superior Classes</p>
                <svg viewBox="0 0 200 12" className="absolute -top-1 right-5 hidden h-2.5 w-24 text-leaf sm:block xl:block lg:hidden" aria-hidden="true">
                  <motion.path
                    d="M2 8 C 50 2, 120 2, 198 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 1.1, ease: 'easeInOut' }}
                  />
                </svg>
              </figcaption>
            </motion.figure>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-0 lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:gap-5">
              {MANTRAS.map((m, i) => (
                <MantraCallout key={m} text={m} i={i} />
              ))}
            </div>
          </motion.div>

          {/* story */}
          <div className="lg:col-span-5">
            <h2 className="display text-[clamp(2rem,min(3.3vw,5vh),2.7rem)] text-ink">
              <MaskLines
                lines={[
                  'One woman’s vision.',
                  <span key="e">
                    Every child’s{' '}
                    <span className="relative inline-block isolate">
                      {/* highlighter swipe */}
                      <motion.span
                        className="absolute inset-x-[-0.1em] bottom-[0.08em] -z-10 h-[0.42em] origin-left rounded-sm bg-gold/60"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.9, ease }}
                        aria-hidden="true"
                      />
                      <span className="serif-i text-leaf-700">future.</span>
                    </span>
                  </span>,
                ]}
              />
            </h2>

            <Reveal delay={0.1} className="mt-6 grid gap-4 text-[1.02rem] leading-[1.75] text-ink-2 sm:grid-cols-2 sm:gap-8 lg:grid-cols-1 lg:gap-4">
              <p>
                Soneeka Bagade is a visionary educator, determined to start a revolution in how children learn. She
                believes education is as much an <span className="font-semibold text-sun-600">art</span> as a{' '}
                <span className="font-semibold text-blue">science</span>.
              </p>
              <p>
                Superior Classes is that belief made real: a place where mistakes become stepping stones and every
                child is seen for who they truly are.
              </p>
            </Reveal>

            <motion.blockquote
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, delay: 0.15, ease }}
              className="relative mt-12 rounded-[28px] bg-navy p-7 pt-12 text-white sm:p-10 sm:pt-14"
            >
              <GridBg tone="dark" fade="none" className="rounded-[28px] opacity-40" />
              <motion.span
                className="absolute -top-6 left-7 grid h-14 w-14 place-items-center rounded-2xl bg-sun text-ink shadow-lift sm:left-10"
                initial={{ scale: 0, rotate: -30 }}
                whileInView={{ scale: 1, rotate: -6 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.6 }}
                aria-hidden="true"
              >
                <Quote className="h-6 w-6 fill-ink" />
              </motion.span>
              <p className="serif-i relative text-[1.4rem] leading-[1.35] sm:text-[1.7rem]">
                “Education is a process in which human beings learn to express themselves, to communicate and to
                question the world.”
              </p>
              <footer className="relative mt-6 flex items-center gap-3 text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-sun">
                <span className="h-px w-10 bg-sun/60" /> Soneeka Bagade
              </footer>
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Story() {
  return (
    <>
      <Director />

      <section id="measure" className="relative overflow-hidden bg-leaf-700 py-16 text-white lg:py-24">
        <GridBg tone="dark" />
        <div className="pointer-events-none absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-gold/25 blur-[120px]" aria-hidden="true" />
        <div className="container-x relative z-[2]">
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow text-sun">What we measure</p>
              <h2 className="display mt-4 text-[clamp(2rem,min(4vw,5vh),3.4rem)]">
                <MaskLines lines={['Marks matter.', <span key="s" className="serif-i text-sun">So do these.</span>]} />
              </h2>
            </div>
            <Reveal delay={0.1} className="lg:col-span-5">
              <p className="max-w-md text-[1.05rem] leading-[1.75] text-white/80">
                Global benchmarks like PISA judge the best education systems by more than test scores. So do we.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8 lg:mt-14 lg:gap-12">
            {MEASURES.map((m, i) => (
              <Measure key={m.word} {...m} i={i} />
            ))}
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-16">
            <Reveal className="rounded-[28px] bg-white p-8 text-ink">
              <p className="display text-[1.6rem] text-navy">
                Every child is <span className="serif-i text-leaf-700">unique.</span>
              </p>
              <p className="mt-3 text-[1rem] leading-[1.7] text-ink-2">
                We take time to understand how each student learns, and shape our teaching methods around them.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="rounded-[28px] bg-sun p-8 text-ink">
              <p className="display text-[1.6rem] text-navy">
                Mistakes <span className="serif-i text-leaf-700">welcome.</span>
              </p>
              <p className="mt-3 text-[1rem] leading-[1.7] text-ink/75">
                Small mistakes as students help avoid big blunders in life. So go on, try it.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
