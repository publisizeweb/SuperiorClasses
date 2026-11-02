import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { PHOTOS } from '../data/site'
import { Chalk, GridBg, MaskLines, Photo } from './ui'

const WORLDS = [
  { key: 'academics', tone: 'blue', title: 'Academics', hook: 'Concepts, not cramming.', text: 'Core subjects taught so students understand the why, not just the what.', tags: ['Concept clarity', 'Doubt-solving', 'Exam confidence'] },
  { key: 'science', tone: 'green', title: 'Science & experiments', hook: 'Trial, error and “aha!”', text: 'Hands-on experiments, models and mini research projects.', tags: ['Experiments', 'Projects', 'Research'] },
  { key: 'art', tone: 'gold', title: 'Art & craft', hook: 'Make it, then make it better.', text: 'Drawing, painting and craft that build focus and self-expression.', tags: ['Self-expression', 'Craft', 'Design'] },
  { key: 'sports', tone: 'blue', title: 'Sports & fitness', hook: 'Strong body, sharp mind.', text: 'Teamwork, discipline and learning to win, and lose, with grace.', tags: ['Teamwork', 'Discipline', 'Fitness'] },
  { key: 'culture', tone: 'green', title: 'Culture & values', hook: 'Roots that hold you steady.', text: 'Festivals, stories, music, respect and the greater truths of life.', tags: ['Values', 'Heritage', 'Respect'] },
  { key: 'explore', tone: 'gold', title: 'Real-world exploration', hook: 'The world is a classroom.', text: 'Real problems, real places and real people beyond the classroom.', tags: ['Exploration', 'Life skills', 'Leadership'] },
]

/* sticky-note paper + accents per logo colour */
const ACCENT = {
  blue: { paper: 'bg-sky-100', hook: 'text-blue', num: 'bg-blue' },
  green: { paper: 'bg-leaf-100', hook: 'text-leaf-700', num: 'bg-leaf-700' },
  gold: { paper: 'bg-[#FFF5CC]', hook: 'text-sun-600', num: 'bg-sun-600' },
}
const TILTS = ['-rotate-[1.5deg]', 'rotate-[1.2deg]', '-rotate-[0.8deg]', 'rotate-[1.6deg]', '-rotate-[1.2deg]', 'rotate-[0.9deg]']
const TAPES = ['-rotate-3', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-2', 'rotate-1']

function useDesktop() {
  const [on, setOn] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const f = () => setOn(mq.matches)
    mq.addEventListener('change', f)
    return () => mq.removeEventListener('change', f)
  }, [])
  return on
}

/* one world as a sticky note with a photo print taped on it */
function Card({ w, i }) {
  const a = ACCENT[w.tone]
  return (
    <article
      className={`note w-[78vw] shrink-0 snap-center transition duration-500 ease-out hover:z-[2] hover:-translate-y-1 hover:rotate-0 sm:w-[330px] ${TILTS[i % TILTS.length]}`}
    >
      <div className={`note-paper flex h-full flex-col p-4 pb-6 pt-6 ${a.paper}`}>
        <span className={`tape ${TAPES[i % TAPES.length]}`} aria-hidden="true" />
        {/* photo print: same size on every note */}
        <div className="relative bg-white p-1.5 shadow-[0_1px_3px_rgb(0_0_0/.15)]">
          <Photo {...PHOTOS[w.key]} tone={w.tone} className="h-[170px] lg:h-[clamp(125px,21vh,185px)]" />
          <span className={`display absolute -bottom-4 right-4 z-[3] grid h-11 w-11 place-items-center rounded-full text-[1rem] text-white shadow-md ${a.num}`}>
            {String(i + 1).padStart(2, '0')}
          </span>
        </div>
        <div className="flex flex-1 flex-col px-2 pt-5">
          <p className={`serif-i text-[1.02rem] ${a.hook}`}>{w.hook}</p>
          <h3 className="display mt-1 text-[1.35rem] text-navy">{w.title}</h3>
          <p className="mt-2 text-[0.92rem] leading-[1.6] text-ink-2">{w.text}</p>
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
            {w.tags.map((t) => (
              <li key={t} className={`rounded-full bg-white/75 px-2.5 py-1 text-[0.74rem] font-semibold ${a.hook}`}>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

function Intro() {
  return (
    <div className="flex w-[82vw] shrink-0 flex-col justify-between sm:w-[380px] lg:w-[380px] lg:pr-8">
      <div>
        <p className="eyebrow text-leaf-700">What we teach</p>
        <h2 className="display mt-4 text-[clamp(1.96rem,min(3.81vw,4.76vh),3.59rem)] text-navy">
          <MaskLines lines={['Six', 'worlds.', <Chalk key="o" className="text-[1.06em] text-leaf-700">One learner.</Chalk>]} />
        </h2>
      </div>
      <div className="mt-8">
        <p className="max-w-sm text-[1.05rem] leading-[1.7] text-ink-2">
          Every child is unique, so learning here doesn&apos;t come in one flavour. The classroom stretches into the
          lab, the art table, the field and the world outside.
        </p>
        <p className="mt-6 hidden items-center gap-2 text-[0.85rem] font-semibold uppercase tracking-[0.18em] text-muted lg:flex">
          Scroll <ArrowRight className="h-4 w-4" />
        </p>
      </div>
    </div>
  )
}

export default function Worlds() {
  const desktop = useDesktop()
  const reduce = useReducedMotion()
  const pinned = desktop && !reduce
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [dist, setDist] = useState(0)

  useLayoutEffect(() => {
    if (!pinned) return
    const measure = () => {
      const t = trackRef.current
      if (t) setDist(Math.max(0, t.scrollWidth - window.innerWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [pinned])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist])
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  if (!pinned) {
    return (
      <section id="worlds" className="relative overflow-hidden bg-paper py-16 text-ink">
        <GridBg />
        <div className="container-x relative z-[2]">
          <Intro />
        </div>
        <div className="no-scrollbar relative z-[2] mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-10 pt-6 sm:px-[max(1.25rem,calc((100vw-72rem)/2))]">
          {WORLDS.map((w, i) => (
            <Card key={w.key} w={w} i={i} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id="worlds" ref={sectionRef} className="relative bg-paper text-ink" style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <GridBg />
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="relative z-[2] flex w-max gap-8 pb-6 pl-[max(1.25rem,calc((100vw-72rem)/2))] pr-[8vw] pt-10"
        >
          <Intro />
          {WORLDS.map((w, i) => (
            <Card key={w.key} w={w} i={i} />
          ))}
        </motion.div>
        <div className="container-x relative z-[2] mt-8">
          <div className="h-[2px] w-full overflow-hidden rounded-full bg-navy/10">
            <motion.div style={{ width: bar }} className="h-full bg-navy" />
          </div>
        </div>
      </div>
    </section>
  )
}
