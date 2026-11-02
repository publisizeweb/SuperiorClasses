import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Camera, Droplets, Leaf, Sun, Wind } from 'lucide-react'
import { PHOTOS } from '../data/site'
import { MaskLines, Photo, Reveal } from './ui'
import { useImage } from '../lib/useImage'

const CHIPS = [
  { t: 'Greenery', Icon: Leaf },
  { t: 'Serene water bodies', Icon: Droplets },
  { t: 'Sustainable design', Icon: Wind },
  { t: 'Hands-on spaces', Icon: Sun },
]

export default function Vision() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-12%', '12%'])
  const hasPhoto = useImage(PHOTOS.campus.src)

  return (
    <section id="vision" ref={ref} className="relative overflow-hidden bg-leaf-900 text-white">
      <motion.div style={{ y }} className="absolute inset-[-14%_0]">
        <Photo {...PHOTOS.campus} tone="green" className="h-full w-full" />
      </motion.div>
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-leaf-900/95 via-leaf-900/70 to-leaf-900/20" />
      {!hasPhoto && (
        <span className="absolute bottom-5 right-5 z-[3] inline-flex items-center gap-1.5 rounded-full bg-black/25 px-3 py-1.5 text-[0.7rem] font-semibold text-white/90 ring-1 ring-white/20 backdrop-blur-sm">
          <Camera className="h-3.5 w-3.5" /> Photo: {PHOTOS.campus.label}
        </span>
      )}
      <div className="container-x relative z-[3] flex min-h-[70vh] flex-col justify-center py-16 lg:py-20">
        <p className="eyebrow text-sun">The road ahead</p>
        <h2 className="display mt-4 max-w-4xl text-[clamp(1.84rem,min(4.9vw,6.12vh),4.49rem)]">
          <MaskLines lines={['A campus', <span key="b" className="serif-i text-sun">that breathes.</span>]} />
        </h2>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-[1.02rem] leading-[1.75] text-white/80">
            The next chapter: a calm, sustainable campus dotted with greenery and serene water bodies, nurturing the
            well-being of students and staff, where every space turns learning into a hands-on experience.
          </p>
        </Reveal>
        <Reveal delay={0.15} as="ul" className="mt-7 flex flex-wrap gap-2">
          {CHIPS.map(({ t, Icon }) => (
            <li key={t} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[0.9rem] font-semibold ring-1 ring-white/20 backdrop-blur">
              <Icon className="h-4 w-4 text-sun" /> {t}
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
