import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import { Bike, Bus } from 'lucide-react'
import { PHOTOS } from '../data/site'
import { Chalk, GridBg, MaskLines, Photo, Reveal } from './ui'

const STEPS = [
  { title: 'Immerse', text: 'We place students in a real situation: a problem, an experiment, a challenge worth solving.', notes: ['Real problems', 'Hands-on set-ups', 'Curiosity first'] },
  { title: 'Perform', text: 'Students try it themselves. Hands on, brain on, no spoon-feeding.', notes: ['Learn by doing', 'Trial and error', 'Teamwork'] },
  { title: 'Feedback', text: 'Clear, kind and specific feedback helps them adjust their approach and improve.', notes: ['Personal attention', 'Kind and specific', 'Adjust and retry'] },
  { title: 'Grow', text: 'They try again, own what they have learned, and ride further on their own.', notes: ['Ownership', 'Confidence', 'Lifelong learning'] },
]

/* sticky-note look per step: paper colour, tilt, sideways offset (desktop) */
const NOTES = [
  { paper: 'bg-[#FFF5CC]', tilt: '-rotate-[1.6deg]', shift: 'lg:mr-10' },
  { paper: 'bg-leaf-100', tilt: 'rotate-[1.3deg]', shift: 'lg:ml-10' },
  { paper: 'bg-sky-100', tilt: '-rotate-[1deg]', shift: 'lg:mr-6' },
  { paper: 'bg-[#FDE6DA]', tilt: 'rotate-[1.6deg]', shift: 'lg:ml-12' },
]

/* one step as a sticky note; it reports itself as active when it crosses the middle of the screen */
function Step({ s, i, active, onActive }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' })
  useEffect(() => {
    if (inView) onActive(i)
  }, [inView, i, onActive])
  const n = NOTES[i % NOTES.length]
  return (
    <div
      ref={ref}
      className={`note transition duration-500 ease-out ${n.shift} ${active ? 'note-lift z-[2] -translate-y-1 rotate-0 scale-[1.02]' : n.tilt}`}
    >
      <div className={`note-paper p-6 pt-8 sm:p-8 sm:pt-10 ${n.paper}`}>
        <span className="tape -rotate-2" aria-hidden="true" />
        <div className="relative flex items-center gap-4">
          <span
            className={`display grid h-12 w-12 shrink-0 place-items-center rounded-full text-[1.05rem] transition-colors duration-500 ${
              active ? 'bg-leaf-700 text-white' : 'bg-white/80 text-ink-2'
            }`}
          >
            0{i + 1}
          </span>
          <h3 className="display text-[clamp(1.6rem,2.4vw,2rem)] text-navy">{s.title}</h3>
        </div>
        <p className="relative mt-4 text-[1rem] leading-[1.7] text-ink-2">{s.text}</p>
        <ul className="relative mt-5 flex flex-wrap gap-2">
          {s.notes.map((t) => (
            <li key={t} className="rounded-full bg-white/75 px-3 py-1 text-[0.8rem] font-semibold text-leaf-700">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Approach() {
  const [active, setActive] = useState(0)
  const stepsRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ['start 60%', 'end 60%'] })
  const bikeX = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="approach" className="relative bg-sun text-ink">
      <GridBg tone="ink" fade="none" className="opacity-50" />
      <div className="container-x relative z-[2] grid gap-10 py-16 lg:grid-cols-12 lg:gap-16 lg:py-0">
        {/* sticky column */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:pt-[72px]">
            <p className="eyebrow text-navy">How we teach</p>
            <h2 className="display mt-4 text-[clamp(2rem,min(3.8vw,5vh),3.2rem)] text-ink">
              <MaskLines lines={['Not a bus ride.', <Chalk key="b" className="text-[1.06em] text-leaf-700">A bike ride.</Chalk>]} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-[1.02rem] leading-[1.75] text-ink/75">
                Educator Jay Cross put it well: on a bus, the driver has all the control. On a bike, students steer,
                pedal and find their balance, and we ride right alongside.
              </p>
            </Reveal>

            <div className="mt-7 grid max-w-md grid-cols-2 gap-3">
              <div className="flex items-center gap-3 rounded-2xl bg-white/40 px-4 py-3.5">
                <Bus className="h-5 w-5 shrink-0 text-ink/45" strokeWidth={1.8} />
                <p className="text-[0.92rem] font-semibold text-ink/55 line-through decoration-ink/40">Passive passengers</p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-leaf-700 px-4 py-3.5 text-white">
                <Bike className="h-5 w-5 shrink-0" strokeWidth={1.8} />
                <p className="text-[0.92rem] font-semibold">Active riders</p>
              </div>
            </div>

            {/* step tracker + ride bar (desktop) */}
            <div className="mt-10 hidden max-w-md lg:block" aria-hidden="true">
              <ol className="grid grid-cols-4 gap-2">
                {STEPS.map((s, i) => (
                  <li key={s.title} className={`transition-colors duration-500 ${i <= active ? 'text-ink' : 'text-ink/40'}`}>
                    <span className="block text-[0.7rem] font-bold tracking-[0.16em]">0{i + 1}</span>
                    <span className={`mt-0.5 block text-[0.95rem] ${i === active ? 'font-bold text-leaf-700' : 'font-semibold'}`}>{s.title}</span>
                  </li>
                ))}
              </ol>
              <div className="relative mt-5 h-[3px] rounded-full bg-ink/15">
                <motion.div style={{ width: bikeX }} className="absolute inset-y-0 left-0 rounded-full bg-leaf-700" />
                <motion.span
                  style={{ left: bikeX }}
                  className="absolute top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-leaf-700 text-white shadow-lift ring-4 ring-sun"
                >
                  <Bike className="h-[18px] w-[18px]" />
                </motion.span>
              </div>
            </div>
          </div>
        </div>

        {/* steps */}
        <div ref={stepsRef} className="space-y-8 lg:col-span-7 lg:pb-[18vh] lg:pt-[calc(50vh-60px)]">
          {STEPS.map((s, i) => (
            <Step key={s.title} s={s} i={i} active={active === i} onActive={setActive} />
          ))}

          {/* closing photo, pinned up like a print, with the quote on it */}
          <Reveal className="mt-12!">
            <figure className="relative -rotate-1 bg-white p-2.5 shadow-[0_2px_3px_rgb(60_40_0/.12),0_22px_36px_-18px_rgb(60_40_0/.5)] sm:p-3.5">
              <span className="absolute -top-3 left-1/2 z-[4] h-7 w-28 -translate-x-1/2 rotate-2 bg-white/60 shadow-[0_1px_2px_rgb(0_0_0/.08)]" aria-hidden="true" />
              <div className="relative overflow-hidden">
                <Photo {...PHOTOS.approach} tone="green" className="aspect-[4/5] w-full sm:aspect-[16/11]" />
                <div className="absolute inset-0 z-[2] bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
                <blockquote className="absolute inset-x-0 bottom-0 z-[3] border-l-4 border-sun p-6 text-white sm:m-8 sm:p-0 sm:pl-6">
                  <p className="serif-i text-[1.15rem] leading-[1.4] sm:text-[1.35rem]">
                    “Real learning occurs when you immerse the learner in a situation, allow them to perform, and give them
                    feedback. As teachers, we create such situations.”
                  </p>
                </blockquote>
              </div>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
