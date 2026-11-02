import { ArrowUpRight } from 'lucide-react'
import { GridBg, MaskLines, Reveal } from './ui'

const ACCENTS = [
  ['border-leaf', 'text-leaf-700'],
  ['border-gold', 'text-sun-600'],
  ['border-blue', 'text-blue'],
  ['border-leaf', 'text-leaf-700'],
]

const POINTS = [
  { title: 'Constant learning', text: 'Learning takes place at every stage of life, for students and teachers alike.' },
  { title: 'Learn by doing', text: 'Resource teaching: learning through trial, error and real experience.' },
  { title: 'Think like a researcher', text: 'Students investigate, test ideas and find answers for themselves.' },
  { title: 'Lifelong inquirers', text: 'Active researchers today become curious, lifelong learners tomorrow.' },
]

export default function Research() {
  return (
    <section id="research" className="relative overflow-hidden bg-paper py-16 text-ink lg:py-24">
      <GridBg />
      <span
        className="display pointer-events-none absolute -right-[4vw] -top-[6vw] select-none text-[40vw] leading-none text-sun/25 lg:text-[24vw]"
        aria-hidden="true"
      >
        ?
      </span>
      <div className="container-x relative z-[2]">
        <p className="eyebrow text-leaf-700">Research &amp; discovery</p>
        <h2 className="display mt-4 max-w-5xl text-[clamp(1.73rem,min(4.35vw,5.44vh),4.12rem)]">
          <MaskLines lines={['The ultimate question:', <span key="q" className="serif-i text-leaf-700">what do you think?</span>]} />
        </h2>
        <div className="mt-7 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="max-w-xl text-[1.02rem] leading-[1.75] text-ink-2">
              Education is how we learn to express ourselves, to communicate and to question the world. So our classroom
              is research-based: students are active researchers, preparing to be lifelong inquirers.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:flex lg:justify-end">
            <a href="#contact" className="btn btn-leaf">
              Ask us anything <span className="btn-chip"><ArrowUpRight /></span>
            </a>
          </Reveal>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map(({ title, text }, i) => (
            <Reveal key={title} delay={i * 0.08} className={`border-t-4 pt-6 sm:pr-8 lg:pb-2 ${ACCENTS[i][0]}`}>
              <p className={`display text-[2.1rem] ${ACCENTS[i][1]}`}>0{i + 1}</p>
              <h3 className="mt-3 text-[1.35rem] font-bold tracking-[-0.02em]">{title}</h3>
              <p className="mt-2 pb-8 text-[0.98rem] leading-[1.7] text-ink-2">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
