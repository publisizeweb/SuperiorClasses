import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Mail, MapPin, Navigation, Pencil, Phone, X } from 'lucide-react'
import logoWhite from '../assets/brand/logo-on-dark.svg'
import { NAV, SITE, directionsLink, telLink, waLink } from '../data/site'
import { GridBg, WhatsAppIcon } from './ui'

const YEAR = new Date().getFullYear()

/* footer social icons: each shows only when its link is set in SITE (src/data/site.js) */
const SOCIAL = [
  { key: 'instagram', label: 'Superior Classes on Instagram', d: 'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM16.5 2h-9A5.5 5.5 0 0 0 2 7.5v9A5.5 5.5 0 0 0 7.5 22h9a5.5 5.5 0 0 0 5.5-5.5v-9A5.5 5.5 0 0 0 16.5 2zm3.7 14.5a3.7 3.7 0 0 1-3.7 3.7h-9a3.7 3.7 0 0 1-3.7-3.7v-9a3.7 3.7 0 0 1 3.7-3.7h9a3.7 3.7 0 0 1 3.7 3.7z' },
  { key: 'directorLinkedin', label: 'Soneeka Bagade on LinkedIn', d: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM9.5 9.75h3.83v1.54h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13V21h-4v-4.96c0-1.18-.02-2.7-1.65-2.7-1.65 0-1.9 1.29-1.9 2.62V21h-4z' },
  { key: 'facebook', label: 'Superior Classes on Facebook', d: 'M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v9h4v-9h3l1-4h-4V9c0-.6.4-1 1-1z' },
  { key: 'youtube', label: 'Superior Classes on YouTube', d: 'M23 7.5s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.3-1C16.6 4 12 4 12 4s-4.6 0-7.8.2c-.4.1-1.4.1-2.3 1C1.2 5.9 1 7.5 1 7.5S.8 9.4.8 11.2v1.7c0 1.9.2 3.7.2 3.7s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.6.2 7.6.2s4.6 0 7.8-.3c.4-.1 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.7v-1.7C23.2 9.4 23 7.5 23 7.5zM9.7 15.1V8.9l6 3.1-6 3.1z' },
]

const HEAD = 'text-[0.74rem] font-bold uppercase tracking-[0.18em] text-white/45'
const LINK = 'inline-flex items-center gap-2.5 py-1.5 text-white/80 transition hover:text-white'

export function Footer() {
  const socials = SOCIAL.filter(({ key }) => SITE[key])
  return (
    <footer className="relative overflow-hidden bg-night pb-28 pt-14 text-white/75 lg:pb-8">
      <GridBg tone="dark" fade="none" className="opacity-60" />
      <div className="brand-stripe absolute inset-x-0 top-0 h-1.5" aria-hidden="true" />
      <div className="container-x relative z-[2]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          {/* brand: logo, line, enquire, socials */}
          <div className="col-span-2 lg:col-span-4">
            <img src={logoWhite} alt="Superior Classes: Learn, Lead, Succeed" className="w-36" loading="lazy" />
            <p className="mt-6 max-w-sm text-[0.97rem] leading-[1.75]">
              Learning beyond boundaries for curious minds aged 12–17, in the heart of Chhatrapati Sambhajinagar.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-4">
              <a href="#contact" className="btn btn-sun btn-sm">
                Enquire now <span className="btn-chip"><ArrowRight /></span>
              </a>
              {socials.length > 0 && (
                <ul className="flex gap-2" aria-label="Social media">
                  {socials.map(({ key, label, d }) => (
                    <li key={key}>
                      <a href={SITE[key]} target="_blank" rel="noopener" aria-label={label} title={label} className="grid h-10 w-10 place-items-center rounded-full text-white ring-1 ring-white/15 transition hover:bg-white hover:text-ink">
                        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true"><path fill="currentColor" d={d} /></svg>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <nav className="col-span-2 lg:col-span-2" aria-label="Footer">
            <h3 className={HEAD}>Explore</h3>
            <ul className="mt-4 flex flex-wrap gap-x-6 text-[0.95rem] lg:block lg:space-y-1">
              {NAV.map(({ id, label }) => (
                <li key={id}><a href={`#${id}`} className={LINK}>{label}</a></li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 sm:col-span-1 lg:col-span-3">
            <h3 className={HEAD}>Visit</h3>
            <p className="mt-4 flex gap-2.5 py-1.5 text-[0.95rem] leading-[1.7] text-white/80">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-sun" />
              <span>{SITE.address.map((line) => <span key={line} className="block">{line}</span>)}</span>
            </p>
            <a href={directionsLink} target="_blank" rel="noopener" className={`${LINK} mt-1 text-[0.95rem] font-semibold text-sun hover:text-white`}>
              <Navigation className="h-4 w-4" /> Get directions
            </a>
          </div>

          <div className="col-span-2 sm:col-span-1 lg:col-span-3">
            <h3 className={HEAD}>Contact</h3>
            <ul className="mt-4 space-y-1 text-[0.95rem]">
              <li><a href={telLink} className={LINK}><Phone className="h-4 w-4 shrink-0 text-sun" />{SITE.phoneDisplay || 'Call us'}</a></li>
              <li><a href={waLink()} target="_blank" rel="noopener" className={LINK}><WhatsAppIcon className="h-4 w-4 shrink-0 text-sun" />WhatsApp</a></li>
              {SITE.email && <li><a href={`mailto:${SITE.email}`} className={`${LINK} break-all`}><Mail className="h-4 w-4 shrink-0 text-sun" />{SITE.email}</a></li>}
            </ul>
          </div>
        </div>

        <p className="display mt-14 select-none whitespace-nowrap text-center text-[17vw] leading-[0.8] text-white/[0.07] lg:text-[11rem]" aria-hidden="true">
          Superior
        </p>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-[0.85rem] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {YEAR} Superior Classes. All rights reserved.</p>
          <p>Chhatrapati Sambhajinagar, Maharashtra</p>
        </div>
      </div>
    </footer>
  )
}

export function MobileBar() {
  const items = [
    { href: telLink, label: 'Call', icon: <Phone className="h-5 w-5" /> },
    { href: waLink(), label: 'WhatsApp', icon: <WhatsAppIcon className="h-5 w-5 text-leaf-700" />, ext: true },
    { href: directionsLink, label: 'Directions', icon: <Navigation className="h-5 w-5" />, ext: true },
  ]
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 gap-1 border-t border-line bg-white/95 px-2 pb-[calc(8px+env(safe-area-inset-bottom))] pt-2 text-ink backdrop-blur-xl lg:hidden"
      aria-label="Quick contact"
    >
      {items.map((it) => (
        <a
          key={it.label}
          href={it.href}
          {...(it.ext ? { target: '_blank', rel: 'noopener' } : {})}
          className="flex min-h-[52px] flex-col items-center justify-center gap-1 rounded-xl text-[0.72rem] font-semibold text-ink-2 active:bg-paper"
        >
          {it.icon}
          {it.label}
        </a>
      ))}
      <a href="#contact" className="flex min-h-[52px] flex-col items-center justify-center gap-1 rounded-xl bg-leaf-700 text-[0.72rem] font-bold text-white">
        <Pencil className="h-5 w-5" />
        Enquire
      </a>
    </nav>
  )
}

export function WhatsAppFab() {
  const [bubble, setBubble] = useState(false)
  useEffect(() => {
    let dismissed = false
    try { dismissed = sessionStorage.getItem('sc-bubble') === '1' } catch { /* storage blocked */ }
    if (dismissed) return
    const t = setTimeout(() => setBubble(true), 8000)
    return () => clearTimeout(t)
  }, [])
  const close = () => {
    setBubble(false)
    try { sessionStorage.setItem('sc-bubble', '1') } catch { /* storage blocked */ }
  }
  return (
    <div className="fixed bottom-6 right-6 z-40 hidden items-center gap-3 lg:flex">
      <AnimatePresence>
        {bubble && (
          <motion.p
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="relative rounded-2xl bg-white py-3 pl-4 pr-10 text-[0.9rem] text-ink shadow-lift ring-1 ring-line"
          >
            Have a question? <span className="font-semibold text-leaf-700">Chat with us</span>
            <button type="button" onClick={close} aria-label="Dismiss" className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-paper">
              <X className="h-4 w-4" />
            </button>
          </motion.p>
        )}
      </AnimatePresence>
      <a
        href={waLink()}
        target="_blank"
        rel="noopener"
        aria-label="Chat with Superior Classes on WhatsApp"
        className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lift ring-2 ring-white transition hover:-translate-y-0.5"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </div>
  )
}
