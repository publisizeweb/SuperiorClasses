import { motion } from 'motion/react'
import { useImage } from '../lib/useImage'
import { Camera } from 'lucide-react'

export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div', ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* Line-by-line masked reveal for big headlines. The observer sits on the (unclipped) wrapper,
   so it triggers reliably; each line slides up from behind its own mask. */
export function MaskLines({ lines, className = '', lineClass = '', delay = 0, animateOnMount = false }) {
  const trigger = animateOnMount ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, amount: 0.2 } }
  return (
    <motion.span className={className} initial="hidden" {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className={`block ${lineClass}`}
            variants={{
              hidden: { y: '105%' },
              show: { y: '0%', transition: { duration: 1, delay: delay + i * 0.09, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/* ---------- photo frames ---------- */
const TONES = {
  navy: 'radial-gradient(120% 90% at 20% 10%, #3A62A8 0%, #1D4078 45%, #0B1B3D 100%)',
  blue: 'radial-gradient(120% 90% at 20% 10%, #2D6BC0 0%, #013B82 50%, #01224D 100%)',
  green: 'radial-gradient(120% 90% at 20% 10%, #3CC57C 0%, #14A858 45%, #0A6235 100%)',
  gold: 'radial-gradient(120% 90% at 20% 10%, #EBD6A4 0%, #D6B46A 50%, #9C7A35 100%)',
  gray: 'radial-gradient(120% 90% at 20% 10%, #8A8F99 0%, #5B5B5B 55%, #2F3138 100%)',
}

/**
 * A photo slot. Shows the real image when it exists in /public, otherwise a
 * clearly-labelled, on-brand placeholder so the layout still looks intentional.
 */
export function Photo({ src, label, word, pos, tone = 'navy', className = '', imgClassName = '', priority = false, children }) {
  const ok = useImage(src)
  return (
    <div className={`grain @container relative overflow-hidden ${className}`}>
      {ok ? (
        <img
          src={src}
          alt={label}
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
          style={pos ? { objectPosition: pos } : undefined}
          loading={priority ? 'eager' : 'lazy'}
          draggable="false"
        />
      ) : (
        <div className="absolute inset-0" style={{ background: TONES[tone] || TONES.navy }} role="img" aria-label={`Photo placeholder: ${label}`}>
          {word && (
            <span className="display absolute -bottom-[0.1em] left-[0.04em] select-none whitespace-nowrap text-[24cqw] text-white/[0.13]">
              {word}
            </span>
          )}
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/25 px-3 py-1.5 text-[0.7rem] font-semibold tracking-wide text-white/90 ring-1 ring-white/20 backdrop-blur-sm">
            <Camera className="h-3.5 w-3.5" /> Photo: {label}
          </span>
        </div>
      )}
      {children}
    </div>
  )
}

/* Decorative grid pattern. tone: light (on paper/white) | dark (on navy/green) | ink (on gold) */
export function GridBg({ tone = 'light', fade = 'y', className = '' }) {
  const pattern = tone === 'dark' ? 'bg-grid-light' : tone === 'ink' ? 'bg-grid-ink' : 'bg-grid'
  const mask = fade === 'hero' ? 'fade-hero' : fade === 'edges' ? 'fade-edges' : fade === 'none' ? '' : 'fade-y'
  return <div className={`pointer-events-none absolute inset-0 z-0 ${pattern} ${mask} ${className}`} aria-hidden="true" />
}

export function WhatsAppIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.91-2.2-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35zM12.05 21.78h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88zm8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.42z"
      />
    </svg>
  )
}

/* ---- chalk lettering ----
   The sketch font's hatching is closed up into a solid letter (grow, then shrink back; small radius so the
   holes in a / e / o stay open), thin stray strokes outside the letters are removed, and the font's own chalk
   strokes are laid back on top. No blur or soft noise: edges stay crisp. Radius scales with text size, hence
   one filter per size. Rendered once, in App. */
export function ChalkDefs() {
  return (
    <svg className="absolute h-0 w-0" aria-hidden="true">
      <filter id="chalk-xs" x="-5%" y="-10%" width="110%" height="120%" colorInterpolationFilters="sRGB">
        {/* close the hatching gaps, then drop thin stray strokes outside the letters */}
        <feMorphology in="SourceGraphic" operator="dilate" radius="0.9" result="grown" />
        <feMorphology in="grown" operator="erode" radius="0.9" result="closed" />
        <feMorphology in="closed" operator="erode" radius="0.5" result="thin" />
        <feMorphology in="thin" operator="dilate" radius="0.5" result="body" />
        {/* chalk body: a touch lighter than the strokes, with a few crisp pin-holes (no blur) */}
        <feColorMatrix in="body" type="matrix" values="0.9 0 0 0 0.1  0 0.9 0 0 0.1  0 0 0.9 0 0.1  0 0 0 1 0" result="light" />
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" seed="7" result="noise" />
        <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -30 23.5" result="holes" />
        <feComposite in="light" in2="holes" operator="in" result="fill" />
        {/* the font's own chalk strokes on top, trimmed to the letter shapes */}
        <feComposite in="SourceGraphic" in2="body" operator="in" result="strokes" />
        <feMerge>
          <feMergeNode in="fill" />
          <feMergeNode in="strokes" />
        </feMerge>
      </filter>
      <filter id="chalk-s" x="-5%" y="-10%" width="110%" height="120%" colorInterpolationFilters="sRGB">
        {/* close the hatching gaps, then drop thin stray strokes outside the letters */}
        <feMorphology in="SourceGraphic" operator="dilate" radius="1.1" result="grown" />
        <feMorphology in="grown" operator="erode" radius="1.1" result="closed" />
        <feMorphology in="closed" operator="erode" radius="0.6" result="thin" />
        <feMorphology in="thin" operator="dilate" radius="0.6" result="body" />
        {/* chalk body: a touch lighter than the strokes, with a few crisp pin-holes (no blur) */}
        <feColorMatrix in="body" type="matrix" values="0.9 0 0 0 0.1  0 0.9 0 0 0.1  0 0 0.9 0 0.1  0 0 0 1 0" result="light" />
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" seed="7" result="noise" />
        <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -30 23.5" result="holes" />
        <feComposite in="light" in2="holes" operator="in" result="fill" />
        {/* the font's own chalk strokes on top, trimmed to the letter shapes */}
        <feComposite in="SourceGraphic" in2="body" operator="in" result="strokes" />
        <feMerge>
          <feMergeNode in="fill" />
          <feMergeNode in="strokes" />
        </feMerge>
      </filter>
      <filter id="chalk-m" x="-5%" y="-10%" width="110%" height="120%" colorInterpolationFilters="sRGB">
        {/* close the hatching gaps, then drop thin stray strokes outside the letters */}
        <feMorphology in="SourceGraphic" operator="dilate" radius="1.5" result="grown" />
        <feMorphology in="grown" operator="erode" radius="1.5" result="closed" />
        <feMorphology in="closed" operator="erode" radius="0.8" result="thin" />
        <feMorphology in="thin" operator="dilate" radius="0.8" result="body" />
        {/* chalk body: a touch lighter than the strokes, with a few crisp pin-holes (no blur) */}
        <feColorMatrix in="body" type="matrix" values="0.9 0 0 0 0.1  0 0.9 0 0 0.1  0 0 0.9 0 0.1  0 0 0 1 0" result="light" />
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" seed="7" result="noise" />
        <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -30 23.5" result="holes" />
        <feComposite in="light" in2="holes" operator="in" result="fill" />
        {/* the font's own chalk strokes on top, trimmed to the letter shapes */}
        <feComposite in="SourceGraphic" in2="body" operator="in" result="strokes" />
        <feMerge>
          <feMergeNode in="fill" />
          <feMergeNode in="strokes" />
        </feMerge>
      </filter>
      <filter id="chalk-l" x="-5%" y="-10%" width="110%" height="120%" colorInterpolationFilters="sRGB">
        {/* close the hatching gaps, then drop thin stray strokes outside the letters */}
        <feMorphology in="SourceGraphic" operator="dilate" radius="1.7" result="grown" />
        <feMorphology in="grown" operator="erode" radius="1.7" result="closed" />
        <feMorphology in="closed" operator="erode" radius="1" result="thin" />
        <feMorphology in="thin" operator="dilate" radius="1" result="body" />
        {/* chalk body: a touch lighter than the strokes, with a few crisp pin-holes (no blur) */}
        <feColorMatrix in="body" type="matrix" values="0.9 0 0 0 0.1  0 0.9 0 0 0.1  0 0 0.9 0 0.1  0 0 0 1 0" result="light" />
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" seed="7" result="noise" />
        <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -30 23.5" result="holes" />
        <feComposite in="light" in2="holes" operator="in" result="fill" />
        {/* the font's own chalk strokes on top, trimmed to the letter shapes */}
        <feComposite in="SourceGraphic" in2="body" operator="in" result="strokes" />
        <feMerge>
          <feMergeNode in="fill" />
          <feMergeNode in="strokes" />
        </feMerge>
      </filter>
      <filter id="chalk-xl" x="-5%" y="-10%" width="110%" height="120%" colorInterpolationFilters="sRGB">
        {/* close the hatching gaps, then drop thin stray strokes outside the letters */}
        <feMorphology in="SourceGraphic" operator="dilate" radius="2.3" result="grown" />
        <feMorphology in="grown" operator="erode" radius="2.3" result="closed" />
        <feMorphology in="closed" operator="erode" radius="1.4" result="thin" />
        <feMorphology in="thin" operator="dilate" radius="1.4" result="body" />
        {/* chalk body: a touch lighter than the strokes, with a few crisp pin-holes (no blur) */}
        <feColorMatrix in="body" type="matrix" values="0.9 0 0 0 0.1  0 0.9 0 0 0.1  0 0 0.9 0 0.1  0 0 0 1 0" result="light" />
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" seed="7" result="noise" />
        <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -30 23.5" result="holes" />
        <feComposite in="light" in2="holes" operator="in" result="fill" />
        {/* the font's own chalk strokes on top, trimmed to the letter shapes */}
        <feComposite in="SourceGraphic" in2="body" operator="in" result="strokes" />
        <feMerge>
          <feMergeNode in="fill" />
          <feMergeNode in="strokes" />
        </feMerge>
      </filter>
    </svg>
  )
}

/* filter per breakpoint, matched to how big the text is at each size */
const CHALK_SIZES = {
  h2: '[filter:url(#chalk-xs)] sm:[filter:url(#chalk-s)] lg:[filter:url(#chalk-m)]', // section headings (~32–54px)
  hero: '[filter:url(#chalk-s)] sm:[filter:url(#chalk-m)] lg:[filter:url(#chalk-l)]', // hero headline (~40–76px)
  xl: '[filter:url(#chalk-s)] sm:[filter:url(#chalk-m)] lg:[filter:url(#chalk-l)] xl:[filter:url(#chalk-xl)]', // giant headings
}

/* An accent word written in chalk. Use sparingly: one word or phrase per section at most. */
export function Chalk({ children, size = 'h2', className = '' }) {
  return (
    <span className={`chalk ${className}`}>
      <span className={CHALK_SIZES[size]}>{children}</span>
    </span>
  )
}
