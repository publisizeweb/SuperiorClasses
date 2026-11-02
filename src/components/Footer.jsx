import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Mail, MapPin, Navigation, Pencil, Phone, X } from 'lucide-react'
import logoWhite from '../assets/brand/logo-on-dark.svg'
import { NAV, SITE, directionsLink, telLink, waLink } from '../data/site'
import { GridBg, WhatsAppIcon } from './ui'

const YEAR = new Date().getFullYear()

const SOCIAL = [
  ['instagram', 'Instagram', 'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM16.5 2h-9A5.5 5.5 0 0 0 2 7.5v9A5.5 5.5 0 0 0 7.5 22h9a5.5 5.5 0 0 0 5.5-5.5v-9A5.5 5.5 0 0 0 16.5 2zm3.7 14.5a3.7 3.7 0 0 1-3.7 3.7h-9a3.7 3.7 0 0 1-3.7-3.7v-9a3.7 3.7 0 0 1 3.7-3.7h9a3.7 3.7 0 0 1 3.7 3.7z'],
  ['facebook', 'Facebook', 'M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v9h4v-9h3l1-4h-4V9c0-.6.4-1 1-1z'],
  ['youtube', 'YouTube', 'M23 7.5s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.3-1C16.6 4 12 4 12 4s-4.6 0-7.8.2c-.4.1-1.4.1-2.3 1C1.2 5.9 1 7.5 1 7.5S.8 9.4.8 11.2v1.7c0 1.9.2 3.7.2 3.7s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.6.2 7.6.2s4.6 0 7.8-.3c.4-.1 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.7v-1.7C23.2 9.4 23 7.5 23 7.5zM9.7 15.1V8.9l6 3.1-6 3.1z'],
]

export function Footer() {
  const socials = SOCIAL.filter(([k]) => SITE[k])
  return (
    <footer className="relative overflow-hidden bg-night pb-28 pt-14 text-white/75 lg:pb-8">
      <GridBg tone="dark" fade="none" className="opacity-60" />
      <div className="brand-stripe absolute inset-x-0 top-0 h-1.5" aria-hidden="true" />
      <div className="container-x relative z-[2]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-5">
            <img src={logoWhite} alt="Superior Classes: Learn, Lead, Succeed" className="w-36" loading="lazy" />
            <p className="mt-6 max-w-sm text-[0.97rem] leading-[1.75]">
              Learning beyond boundaries for curious minds aged 12–17, in the heart of Chhatrapati Sambhajinagar.
            </p>
            <a href="#contact" className="btn btn-sun btn-sm mt-7">
              Enquire now <span className="btn-chip"><ArrowRight /></span>
            </a>
          </div>
          <nav className="lg:col-span-2" aria-label="Footer">
            <h3 className="text-[0.74rem] font-bold uppercase tracking-[0.18em] text-white/45">Explore</h3>
            <ul className="mt-3 text-[0.95rem]">
              {NAV.map(({ id, label }) => (
                <li key={id}><a href={`#${id}`} className="inline-block py-2 text-white/80 transition hover:text-white">{label}</a></li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-2">
            <h3 className="text-[0.74rem] font-bold uppercase tracking-[0.18em] text-white/45">Contact</h3>
            <ul className="mt-3 text-[0.95rem]">
              <li><a href={telLink} className="inline-flex items-center gap-2 py-2 text-white/80 hover:text-white"><Phone className="h-4 w-4 text-sun" />{SITE.phoneDisplay || 'Call us'}</a></li>
              <li><a href={waLink()} target="_blank" rel="noopener" className="inline-flex items-center gap-2 py-2 text-white/80 hover:text-white"><WhatsAppIcon className="h-4 w-4 text-sun" />WhatsApp</a></li>
              {SITE.email && <li><a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 py-2 text-white/80 hover:text-white"><Mail className="h-4 w-4 text-sun" />{SITE.email}</a></li>}
            </ul>
          </div>
          <div className="col-span-2 lg:col-span-3">
            <h3 className="text-[0.74rem] font-bold uppercase tracking-[0.18em] text-white/45">Visit</h3>
            <p className="mt-5 flex gap-2.5 text-[0.95rem] leading-[1.7] text-white/80">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-sun" />
              {SITE.address.join(' ')}
            </p>
            {socials.length > 0 && (
              <div className="mt-6 flex gap-2">
                {socials.map(([k, label, d]) => (
                  <a key={k} href={SITE[k]} target="_blank" rel="noopener" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full text-white ring-1 ring-white/15 hover:bg-white hover:text-ink">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true"><path fill="currentColor" d={d} /></svg>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="display mt-14 select-none whitespace-nowrap text-center text-[17vw] leading-[0.8] text-white/[0.07] lg:text-[11rem]" aria-hidden="true">
          Superior
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-[0.85rem] text-white/50">
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
