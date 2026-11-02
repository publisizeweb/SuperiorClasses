import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpRight, Atom, BookOpen, FlaskConical, Palette, Pencil, Ruler, Scissors, Volleyball } from 'lucide-react'
import { PHOTOS, waLink } from '../data/site'
import { Chalk, GridBg, Photo, WhatsAppIcon } from './ui'

const ease = [0.16, 1, 0.3, 1]

/* hand-drawn style doodles floating around the headline (kept to the edges, faint, so the headline leads).
   `m` = also shown on phones (smaller, in the corners) */
const SKETCHES = [
  { Icon: Volleyball, color: 'text-leaf-700', pos: 'left-[5%] top-[17%] lg:left-[9%] lg:top-[24%]', size: 'h-9 w-9 lg:h-14 lg:w-14', r: -12, m: true },
  { Icon: FlaskConical, color: 'text-blue', pos: 'right-[5%] top-[17%] lg:right-[10%] lg:top-[22%]', size: 'h-9 w-9 lg:h-[3.75rem] lg:w-[3.75rem]', r: 10, m: true },
  { Icon: BookOpen, color: 'text-navy', pos: 'left-[7%] bottom-[1%] lg:left-[14%] lg:bottom-[20%]', size: 'h-9 w-9 lg:h-[3.75rem] lg:w-[3.75rem]', r: -6, m: true },
  { Icon: Pencil, color: 'text-sun-600', pos: 'right-[7%] bottom-[1.5%] lg:right-[15%] lg:bottom-[19%]', size: 'h-8 w-8 lg:h-12 lg:w-12', r: 18, m: true },
  { Icon: Scissors, color: 'text-leaf-700', pos: 'right-[3.5%] top-[50%]', size: 'h-11 w-11', r: -20 },
  { Icon: Palette, color: 'text-sun-600', pos: 'left-[3.5%] top-[52%]', size: 'h-12 w-12', r: 8 },
  { Icon: Atom, color: 'text-blue', pos: 'left-[24%] top-[12%]', size: 'h-10 w-10', r: 0 },
  { Icon: Ruler, color: 'text-navy', pos: 'right-[24%] top-[11%]', size: 'h-10 w-10', r: 30 },
]

function Sketches() {
  const reduce = useReducedMotion()
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
      {/* wobbles the lines slightly so the icons look drawn by hand */}
      <svg className="absolute h-0 w-0">
        <filter id="sketchy">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="2.2" />
        </filter>
      </svg>
      {SKETCHES.map(({ Icon, color, pos, size, r, m }, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} ${color} ${m ? '' : 'hidden lg:block'}`}
          initial={{ opacity: 0, scale: 0.8, rotate: r }}
          animate={
            reduce
              ? { opacity: 0.5, scale: 1, rotate: r }
              : { opacity: 0.5, scale: 1, rotate: [r, r + 7, r - 4, r], y: [0, -12, 4, 0] }
          }
          transition={{
            opacity: { duration: 1, delay: 0.4 + i * 0.08 },
            scale: { duration: 1, delay: 0.4 + i * 0.08 },
            rotate: { duration: 7 + (i % 4), repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 },
            y: { duration: 6 + (i % 3) * 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 },
          }}
          style={{ filter: 'url(#sketchy)' }}
        >
          {/* two slightly offset strokes, like a pencil going over a line twice */}
          <Icon className={`absolute left-[2px] top-[1.5px] ${size} opacity-40`} strokeWidth={1.2} />
          <Icon className={`relative ${size}`} strokeWidth={1.5} />
        </motion.div>
      ))}
    </div>
  )
}

export default function Hero() {
  return (
    <>
      <section id="home" className="relative overflow-hidden bg-paper pt-[72px] text-ink">
        <GridBg fade="edges" />
        {/* soft glows in the logo colours, kept to the far edges (small and mostly off-screen on phones)
            so the text always sits on clean paper, as on desktop */}
        <div className="pointer-events-none absolute -left-36 top-0 h-[220px] w-[220px] rounded-full bg-leaf/15 blur-[80px] sm:-left-24 sm:top-10 sm:h-[420px] sm:w-[420px] sm:bg-leaf/20 sm:blur-[110px]" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-36 bottom-0 h-[220px] w-[220px] rounded-full bg-gold/25 blur-[80px] sm:-right-24 sm:h-[420px] sm:w-[420px] sm:bg-gold/35 sm:blur-[110px]" aria-hidden="true" />
        <div className="pointer-events-none absolute left-1/2 top-0 hidden h-[260px] w-[520px] -translate-x-1/2 rounded-full bg-sky/15 blur-[110px] sm:block" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32 bg-gradient-to-b from-transparent to-paper" aria-hidden="true" />
        <Sketches />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="container-x relative z-[2] flex flex-col items-center py-20 text-center lg:min-h-[calc(82svh-72px)] lg:justify-center lg:py-16"
        >
          <h1 className="max-w-4xl font-display text-[2.3rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-navy sm:text-[3.4rem] lg:text-[4.2rem]">
            Learning beyond{' '}
            <span className="relative inline-block text-[1.08em] text-leaf-700">
              <Chalk size="hero">boundaries.</Chalk>
              {/* chalk-stroke underline (roughened by the same filter as the doodles) */}
              <svg viewBox="0 0 300 14" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full text-gold" style={{ filter: 'url(#sketchy)' }} aria-hidden="true">
                <path d="M3 10 C 80 2, 200 2, 297 8" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-[1.05rem] leading-[1.7] text-ink-2 sm:text-[1.12rem]">
            Academics, science, arts and sports, all under one roof.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href="#contact" className="btn btn-ink">
              Enquire now <span className="btn-chip"><ArrowUpRight /></span>
            </a>
            <a href={waLink()} target="_blank" rel="noopener" className="btn btn-outline">
              WhatsApp us <span className="btn-chip"><WhatsAppIcon /></span>
            </a>
          </div>
        </motion.div>
      </section>
      <Reel />
    </>
  )
}

/* Photo frame that grows to full-bleed as you scroll */
function Reel() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const scale = useTransform(scrollYProgress, [0, 0.55], reduce ? [1, 1] : [0.8, 1])
  const radius = useTransform(scrollYProgress, [0, 0.55], reduce ? [0, 0] : [40, 0])
  const textY = useTransform(scrollYProgress, [0.3, 0.75], reduce ? [0, 0] : [60, 0])
  const textO = useTransform(scrollYProgress, [0.3, 0.7], reduce ? [1, 1] : [0, 1])

  return (
    <section id="reel" ref={ref} className="relative h-[150vh] bg-paper lg:h-[180vh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <GridBg />
        <motion.div style={{ scale, borderRadius: radius }} className="relative h-full w-full overflow-hidden will-change-transform">
          <Photo {...PHOTOS.hero} tone="blue" className="h-full w-full" priority />
          <div className="absolute inset-0 z-[2] bg-gradient-to-t from-navy/95 via-navy/30 to-transparent" />
          <motion.div style={{ y: textY, opacity: textO }} className="container-x absolute inset-x-0 bottom-[10%] z-[3] text-white">
            <p className="eyebrow text-gold">Where it all comes together</p>
            <p className="display mt-4 max-w-5xl text-[clamp(1.60rem,min(3.81vw,4.76vh),3.43rem)]">
              Academics, arts, sports & the <span className="serif-i text-gold">real world.</span>
            </p>
            <a href="#worlds" className="mt-8 inline-flex items-center gap-3 text-[0.95rem] font-semibold text-white/85 hover:text-white">
              <span className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-white/40">
                <ArrowDown className="h-4 w-4" />
              </span>
              Explore the six worlds
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
