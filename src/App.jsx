import Header from './components/Header'
import Hero from './components/Hero'
import Formula from './components/Formula'
import Worlds from './components/Worlds'
import Story from './components/Story'
import Approach from './components/Approach'
import Research from './components/Research'
import Gallery from './components/Gallery'
import Voices from './components/Voices'
import Vision from './components/Vision'
import Contact from './components/Contact'
import { Footer, MobileBar, WhatsAppFab } from './components/Footer'
import { ChalkDefs } from './components/ui'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-xl focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <ChalkDefs />
      <Header />
      <main id="main">
        <Hero />
        <Formula />
        <Worlds />
        <Story />
        <Approach />
        <Research />
        <Gallery />
        <Voices />
        <Vision />
        <Contact />
      </main>
      <Footer />
      <MobileBar />
      <WhatsAppFab />
    </>
  )
}
