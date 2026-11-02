import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, ChevronDown, MapPin, Navigation, Phone } from 'lucide-react'
import { SITE, directionsLink, mapEmbedSrc, telLink, waLink } from '../data/site'
import { Chalk, GridBg, MaskLines, Reveal, WhatsAppIcon } from './ui'

const CLASSES = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12', 'Other']
const BOARDS = ['SSC (State Board)', 'CBSE', 'ICSE', 'IB / IGCSE', 'Other']
const INTERESTS = ['Academics', 'Science & experiments', 'Art & craft', 'Sports', 'Culture & values', 'Everything']

const cleanPhone = (v) => {
  let d = v.replace(/\D/g, '')
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2)
  if (d.length === 11 && d.startsWith('0')) d = d.slice(1)
  return d
}

const inputCls = (bad) =>
  `h-12 w-full rounded-xl border bg-white px-4 text-[0.97rem] text-ink outline-none transition placeholder:text-[#9AA1B0] focus:ring-4 ${
    bad ? 'border-coral focus:ring-coral/15' : 'border-line focus:border-navy focus:ring-navy/10'
  }`

function Field({ label, required, id, error, children, select }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.85rem] font-semibold text-ink">
        {label} {required && <span className="text-coral">*</span>}
      </label>
      <div className="relative">
        {children}
        {select && <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />}
      </div>
      {error && <p id={`${id}-err`} className="mt-1.5 text-[0.82rem] font-semibold text-coral">{error}</p>}
    </div>
  )
}

function EnquiryForm() {
  const [v, setV] = useState({ student: '', cls: '', board: '', parent: '', phone: '', msg: '', interests: [] })
  const [err, setErr] = useState({})
  const [sentUrl, setSentUrl] = useState('')
  const set = (k) => (e) => {
    setV((s) => ({ ...s, [k]: e.target.value }))
    setErr((s) => ({ ...s, [k]: '' }))
  }
  const toggle = (i) => setV((s) => ({ ...s, interests: s.interests.includes(i) ? s.interests.filter((x) => x !== i) : [...s.interests, i] }))

  const submit = (e) => {
    e.preventDefault()
    const phone = cleanPhone(v.phone)
    const next = {
      student: v.student.trim() ? '' : "Please enter the student's name.",
      cls: v.cls ? '' : 'Please choose a class.',
      phone: /^[6-9]\d{9}$/.test(phone) ? '' : 'Please enter a valid 10-digit mobile number.',
    }
    setErr(next)
    const firstBad = Object.keys(next).find((k) => next[k])
    if (firstBad) {
      const el = document.getElementById(`f-${firstBad}`)
      el?.focus({ preventScroll: true })
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    const lines = [
      `${SITE.greeting} I'd like to know more about Superior Classes.`,
      '',
      `*Student:* ${v.student.trim()}`,
      `*Class:* ${v.cls}`,
      v.board ? `*Board:* ${v.board}` : null,
      v.parent.trim() ? `*Parent:* ${v.parent.trim()}` : null,
      `*Phone:* +91 ${phone}`,
      v.interests.length ? `*Interested in:* ${v.interests.join(', ')}` : null,
      v.msg.trim() ? `*Message:* ${v.msg.trim()}` : null,
      '',
      '(Sent from the Superior Classes website)',
    ].filter((l) => l !== null)
    const url = waLink(lines.join('\n'))
    setSentUrl(url)
    window.open(url, '_blank', 'noopener')
  }

  return (
    /* the form is a sticky note; it straightens while you are typing in it */
    <form onSubmit={submit} noValidate className="note -rotate-[0.8deg] text-ink transition duration-500 ease-out focus-within:rotate-0">
      <div className="note-paper bg-[#FFF5CC] p-6 pt-10 sm:p-8 sm:pt-11">
        <span className="tape -rotate-2" aria-hidden="true" />
        <p className="display text-[1.6rem] text-navy">Enquiry form</p>
        <p className="mt-1 text-[0.92rem] text-ink-2">Takes under a minute. Your message opens in WhatsApp, ready to send.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Student's name" required id="f-student" error={err.student}>
              <input id="f-student" value={v.student} onChange={set('student')} autoComplete="name" placeholder="e.g. Aarya Patil" className={inputCls(err.student)} aria-invalid={!!err.student} aria-describedby={err.student ? 'f-student-err' : undefined} />
            </Field>
          </div>
          <Field label="Class" required id="f-cls" error={err.cls} select>
            <select id="f-cls" value={v.cls} onChange={set('cls')} className={`${inputCls(err.cls)} appearance-none pr-10`} aria-invalid={!!err.cls} aria-describedby={err.cls ? 'f-cls-err' : undefined}>
              <option value="">Select class</option>
              {CLASSES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Board" id="f-board" select>
            <select id="f-board" value={v.board} onChange={set('board')} className={`${inputCls(false)} appearance-none pr-10`}>
              <option value="">Select board</option>
              {BOARDS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Parent's name" id="f-parent">
            <input id="f-parent" value={v.parent} onChange={set('parent')} placeholder="Optional" className={inputCls(false)} />
          </Field>
          <Field label="Phone / WhatsApp" required id="f-phone" error={err.phone}>
            <input id="f-phone" type="tel" inputMode="tel" autoComplete="tel" value={v.phone} onChange={set('phone')} placeholder="10-digit mobile number" className={inputCls(err.phone)} aria-invalid={!!err.phone} aria-describedby={err.phone ? 'f-phone-err' : undefined} />
          </Field>
        </div>

        <fieldset className="mt-6">
          <legend className="mb-2.5 text-[0.85rem] font-semibold text-ink">Interested in</legend>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((i) => {
              const on = v.interests.includes(i)
              return (
                <button
                  type="button"
                  key={i}
                  onClick={() => toggle(i)}
                  aria-pressed={on}
                  className={`rounded-full px-3.5 py-2 text-[0.85rem] font-semibold transition ${
                    on ? 'bg-leaf-700 text-white' : 'bg-white/80 text-ink-2 ring-1 ring-ink/10 hover:ring-ink/30'
                  }`}
                >
                  {i}
                </button>
              )
            })}
          </div>
        </fieldset>

        <div className="mt-6">
          <label htmlFor="f-msg" className="mb-1.5 block text-[0.85rem] font-semibold text-ink">Message</label>
          <textarea id="f-msg" rows={3} value={v.msg} onChange={set('msg')} placeholder="Questions, preferred timings, anything at all" className="w-full resize-y rounded-xl border border-line bg-white px-4 py-3 text-[0.97rem] outline-none transition placeholder:text-[#9AA1B0] focus:border-navy focus:ring-4 focus:ring-navy/10" />
        </div>

        <button type="submit" className="btn btn-wa mt-7 w-full">
          Send on WhatsApp <span className="btn-chip"><WhatsAppIcon /></span>
        </button>
        <p className="mt-3 text-center text-[0.82rem] text-ink-2/80">Nothing is stored on this website.</p>
        <AnimatePresence>
          {sentUrl && (
            <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 rounded-xl bg-leaf-100 px-4 py-3 text-center text-[0.88rem] font-semibold text-leaf-700" role="status">
              WhatsApp is opening. If it didn&apos;t,{' '}
              <a href={sentUrl} target="_blank" rel="noopener" className="underline underline-offset-2">tap here to send your message</a>.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}

function ContactRow({ href, ext, Icon, title, sub }) {
  return (
    <a
      href={href}
      {...(ext ? { target: '_blank', rel: 'noopener' } : {})}
      className="group flex items-center gap-4 border-b border-line py-4 first:pt-0"
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-navy ring-1 ring-line">{Icon}</span>
      <span className="flex-1">
        <span className="block text-[1.02rem] font-semibold text-ink">{title}</span>
        <span className="block text-[0.9rem] text-muted">{sub}</span>
      </span>
      <ArrowUpRight className="h-5 w-5 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy" />
    </a>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-paper py-16 text-ink lg:py-24">
      <GridBg />
      <div className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-gold/20 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-leaf/10 blur-[120px]" aria-hidden="true" />
      <div className="container-x relative z-[2]">
        <p className="eyebrow text-leaf-700">Admissions &amp; enquiries</p>
        <h2 className="display mt-4 text-navy text-[clamp(2.30rem,min(7.62vw,9.52vh),6.86rem)]">
          <MaskLines lines={[<span key="l">Let&apos;s <Chalk size="xl" className="text-[1.04em] text-leaf-700">talk.</Chalk></span>]} />
        </h2>
        <div>
          <div className="relative mt-8 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
            <div className="flex flex-col">
              <Reveal>
                <p className="max-w-md text-[1.08rem] leading-[1.75] text-ink-2">
                  Tell us a little about your child and we&apos;ll get back to you. Prefer to talk? Call or WhatsApp us
                  directly.
                </p>
              </Reveal>
              <Reveal delay={0.1} className="mt-7 border-t border-line pt-5">
                <ContactRow href={telLink} Icon={<Phone className="h-5 w-5" />} title="Call us" sub={SITE.phoneDisplay || 'Tap to call'} />
                <ContactRow href={waLink()} ext Icon={<WhatsAppIcon className="h-5 w-5" />} title="WhatsApp" sub="Chat with our team" />
                <ContactRow href={directionsLink} ext Icon={<MapPin className="h-5 w-5" />} title="Visit us" sub="Opp. BSNL Office, Town Center, Chhatrapati Sambhajinagar" />
              </Reveal>
              <Reveal delay={0.15} className="relative mt-8 min-h-80 flex-1 overflow-hidden rounded-[22px] ring-1 ring-line">
                {/* The iframe is shifted up 170px so Google's place card (top-left) sits outside the visible frame.
                    For an exact pin, update SITE.mapsQuery / mapsLink in src/data/site.js */}
                <iframe
                  title="Map showing the Town Centre area of Chhatrapati Sambhajinagar, where Superior Classes is located"
                  src={mapEmbedSrc}
                  className="absolute inset-x-0 -top-[170px] h-[calc(100%+170px)] w-full border-0 grayscale-[35%]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <a href={directionsLink} target="_blank" rel="noopener" className="btn btn-light btn-sm absolute bottom-3 right-3 shadow-soft">
                  Directions <span className="btn-chip"><Navigation /></span>
                </a>
              </Reveal>
            </div>
            <Reveal delay={0.05}>
              <EnquiryForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
