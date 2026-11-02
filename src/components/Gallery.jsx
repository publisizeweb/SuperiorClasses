import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, X } from 'lucide-react'
import { GALLERY } from '../data/site'
import { GridBg, MaskLines, Photo, Reveal } from './ui'
import { useImage } from '../lib/useImage'

const TONES = ['green', 'gold', 'navy', 'blue', 'gray']
const WIDTHS = ['w-[240px] sm:w-[300px]', 'w-[200px] sm:w-[240px]', 'w-[260px] sm:w-[340px]', 'w-[210px] sm:w-[260px]', 'w-[240px] sm:w-[290px]']

function Tile({ item, i, onOpen }) {
  const real = useImage(item.src)
  const inner = <Photo src={item.src} label={item.caption} word={item.word} pos={item.pos} tone={TONES[i % TONES.length]} className="h-full w-full" />
  return (
    <figure className={`group relative h-[180px] shrink-0 overflow-hidden rounded-[20px] sm:h-[230px] ${WIDTHS[i % WIDTHS.length]}`}>
      {real ? (
        <button type="button" onClick={() => onOpen(item)} className="block h-full w-full" aria-label={`View photo: ${item.caption}`}>
          {inner}
        </button>
      ) : (
        inner
      )}
      <figcaption className="pointer-events-none absolute bottom-3 left-3 z-[3] rounded-full bg-white px-3.5 py-1.5 text-[0.82rem] font-semibold text-ink">
        {item.caption}
      </figcaption>
    </figure>
  )
}

function Row({ items, reverse, offset, onOpen }) {
  return (
    <div className="group/row overflow-hidden">
      <div className={`flex w-max gap-4 ${reverse ? 'animate-marquee-rev' : 'animate-marquee'} group-hover/row:[animation-play-state:paused]`}>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 gap-4" aria-hidden={k === 1 || undefined}>
            {items.map((item, i) => (
              <Tile key={`${k}-${i}`} item={item} i={i + offset} onOpen={onOpen} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Gallery() {
  const [zoom, setZoom] = useState(null)
  useEffect(() => {
    if (!zoom) return
    const onKey = (e) => e.key === 'Escape' && setZoom(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoom])

  const half = Math.ceil(GALLERY.length / 2)
  return (
    <section id="gallery" className="relative overflow-hidden bg-white py-16 text-ink lg:py-24">
      <GridBg />
      <div className="container-x relative z-[2] grid items-end gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="eyebrow text-leaf-700">Life at Superior</p>
          <h2 className="display mt-4 text-navy text-[clamp(1.84rem,min(4.9vw,6.12vh),4.49rem)]">
            <MaskLines lines={['Raw. Real.', <span key="u" className="serif-i text-leaf-700">Unfiltered.</span>]} />
          </h2>
        </div>
        <Reveal delay={0.1} className="lg:col-span-4 lg:pb-4">
          <p className="text-[1.05rem] leading-[1.7] text-ink-2">Classrooms, experiments, matches and celebrations: the moments where learning goes beyond the book.</p>
          <a href="#contact" className="btn btn-outline mt-6">
            Book a visit <span className="btn-chip"><ArrowUpRight /></span>
          </a>
        </Reveal>
      </div>

      <div className="relative z-[2] mt-10 space-y-3">
        <Row items={GALLERY.slice(0, half)} offset={0} onOpen={setZoom} />
        <Row items={GALLERY.slice(half)} offset={half} reverse onOpen={setZoom} />
      </div>

      <AnimatePresence>
        {zoom && (
          <motion.div
            className="fixed inset-0 z-[70] grid place-items-center bg-night/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(null)}
            role="dialog"
            aria-modal="true"
            aria-label={zoom.caption}
          >
            <motion.figure initial={{ scale: 0.96 }} animate={{ scale: 1 }} className="relative" onClick={(e) => e.stopPropagation()}>
              <img src={zoom.src} alt={zoom.caption} className="max-h-[80vh] w-auto rounded-2xl" />
              <figcaption className="mt-3 text-center text-sm font-semibold text-white">{zoom.caption}</figcaption>
              <button type="button" onClick={() => setZoom(null)} className="absolute -right-3 -top-3 grid h-10 w-10 place-items-center rounded-full bg-white text-ink" aria-label="Close" autoFocus>
                <X className="h-5 w-5" />
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
