import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Menu, Phone, X } from 'lucide-react'
import markWhite from '../assets/brand/mark-on-dark.svg'
import wordWhite from '../assets/brand/wordmark-on-dark.svg'
import markColor from '../assets/brand/mark.svg'
import wordColor from '../assets/brand/wordmark.svg'
import { NAV, telLink, waLink } from '../data/site'
import { WhatsAppIcon } from './ui'

const OWNER = {
  home: 'home', reel: 'home', numbers: 'home', manifesto: 'home', worlds: 'worlds', story: 'story', measure: 'story',
  approach: 'approach', research: 'approach', gallery: 'gallery', voices: 'gallery', vision: 'gallery', contact: 'contact',
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  // while a nav click is smooth-scrolling, keep the clicked item highlighted instead of
  // letting the pill run through every section on the way
  const lock = useRef(null) // id of the clicked section, or null
  const lockTimer = useRef(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // scroll spy: the section under a line 45% down the screen is the active one
  useEffect(() => {
    let raf = 0
    const covers = (id) => {
      const r = document.getElementById(id)?.getBoundingClientRect()
      const line = window.innerHeight * 0.45
      return r && r.top <= line && r.bottom > line
    }
    const spy = () => {
      raf = 0
      if (lock.current) return
      const id = Object.keys(OWNER).find(covers)
      if (id) setActive(OWNER[id])
    }
    const release = () => {
      lock.current = null
      spy()
    }
    const onScroll = () => {
      if (lock.current) {
        // unlock once scrolling stops: quickly if we arrived, later if the user scrolled elsewhere
        clearTimeout(lockTimer.current)
        lockTimer.current = setTimeout(release, covers(lock.current) ? 160 : 900)
      }
      if (!raf) raf = requestAnimationFrame(spy)
    }
    spy()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
      clearTimeout(lockTimer.current)
    }
  }, [])

  const pick = (id) => {
    setActive(id)
    lock.current = id
    clearTimeout(lockTimer.current)
    lockTimer.current = setTimeout(() => (lock.current = null), 1500)
  }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
          scrolled ? 'border-b border-line bg-white/90 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <div className="brand-stripe absolute inset-x-0 top-0 h-1" aria-hidden="true" />
        <div className="container-x flex h-[72px] items-center">
          <a href="#home" className="flex items-center gap-2.5" aria-label="Superior Classes: home">
            <img src={markColor} alt="" className="h-9 w-auto" />
            <img src={wordColor} alt="Superior Classes" className="h-[24px] w-auto" />
          </a>

          <nav className="ml-auto hidden lg:block" aria-label="Main">
            <ul className="flex items-center gap-1 rounded-full bg-white/80 p-1 ring-1 ring-line backdrop-blur">
              {NAV.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => pick(id)}
                    aria-current={active === id ? 'true' : undefined}
                    className={`block rounded-full px-4 py-2 text-[0.88rem] font-semibold transition-colors ${
                      active === id ? 'bg-leaf-700 text-white' : 'text-ink-2 hover:text-leaf-700'
                    }`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-6">
            <a href="#contact" className="btn btn-leaf btn-sm hidden sm:inline-flex">
              Enquire <span className="btn-chip"><ArrowUpRight /></span>
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full bg-navy text-white lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu lives outside <header>: the header's backdrop-blur (added after scrolling) makes it
          the containing block for fixed children, which would squeeze this overlay into the 72px bar. */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="grain fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-night px-6 pb-8 pt-4 text-white"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-leaf/30 blur-3xl" aria-hidden="true" />
            <div className="relative z-[2] flex h-14 items-center justify-between">
              <span className="flex items-center gap-2.5">
                <img src={markWhite} alt="" className="h-8" />
                <img src={wordWhite} alt="Superior Classes" className="h-5" />
              </span>
              <button type="button" onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink" aria-label="Close menu" autoFocus>
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="relative z-[2] my-auto py-10" aria-label="Mobile">
              <ul>
                {NAV.map(({ id, label }, i) => (
                  <li key={id} className="overflow-hidden">
                    <motion.a
                      href={`#${id}`}
                      onClick={() => {
                        pick(id)
                        setOpen(false)
                      }}
                      initial={{ y: '100%' }}
                      animate={{ y: '0%' }}
                      transition={{ delay: 0.25 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="display flex items-baseline justify-between py-1 text-[2.1rem] text-white"
                    >
                      {label}
                      <span className="serif-i text-xl text-white/40">0{i + 1}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="relative z-[2] grid gap-3">
              <a
                href="#contact"
                onClick={() => {
                  pick('contact')
                  setOpen(false)
                }}
                className="btn btn-sun"
              >
                Enquire now <span className="btn-chip"><ArrowUpRight /></span>
              </a>
              <div className="grid grid-cols-2 gap-3">
                <a href={waLink()} target="_blank" rel="noopener" className="btn btn-wa btn-plain gap-2">
                  <WhatsAppIcon className="h-5 w-5" /> WhatsApp
                </a>
                <a href={telLink} className="btn btn-ghost btn-plain gap-2">
                  <Phone className="h-4 w-4" /> Call
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
