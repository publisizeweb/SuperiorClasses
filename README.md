# Superior Classes: website

React + Vite + Tailwind CSS v4, with animations from Motion and icons from Lucide.
Typography: Montserrat (headings, the same family as the "SUPERIOR" logo wordmark) + Plus Jakarta Sans (body text).
Design: bold, immersive, dark-led, with a scroll-expanding hero reel, a pinned horizontal worlds strip, scroll-lit text and colour-blocked sections.

```bash
npm install
npm run dev       # http://localhost:5190 ("under construction" page); the site is at /sc-preview-5x62jce2rg/
npm run build     # production files in dist/ (upload this folder to any static host)
```

## Before going live

0. **Launch switch.** Until launch, `/` shows the "under construction" page (`index.html`, `src/construction/`) and the real site lives at the private path `/sc-preview-5x62jce2rg/` (shared only with the client, marked `noindex`). To launch: replace `index.html` with `sc-preview-5x62jce2rg/index.html`, remove the `robots` meta line and fix the canonical/og:url back to `%VITE_SITE_URL%/`, delete `src/construction/` and the `build.rollupOptions` + `previewSlash` bits in `vite.config.js`.

1. **Contact details** (required). Edit the `SITE` block at the top of [src/data/site.js](src/data/site.js):
   - `whatsapp`: country code plus number, digits only (e.g. `919876543210`). Every WhatsApp button and the enquiry form use it.
   - `phone`: used by every Call button. `phoneDisplay` is optional display text.
   - `email`, `instagram`, `facebook`, `youtube`: optional. They appear only when set.
   - `mapsLink`: optional exact Google Maps share link for the Directions buttons.
2. **Testimonials** (required). The six in `TESTIMONIALS` (same file) are **samples**. Replace them with real quotes, then remove the "Sample" badge in [src/components/Voices.jsx](src/components/Voices.jsx).
3. **Photos.** The site currently uses five TEMPORARY photos from `public/photos/temp/` (set in `PHOTOS` / `GALLERY` in `src/data/site.js`). Replace them with the client's real photos before launch. The design is built around real photos. Until they arrive, every photo slot shows a coloured frame labelled "Photo: …". Drop JPGs (landscape, about 2000 px wide, under ~400 KB) into `public/` with these names, and each one replaces its frame automatically:
   - `public/photos/`: `hero.jpg` (wide class shot, used in the full-screen reel), `academics.jpg`, `science.jpg`, `art.jpg`, `sports.jpg`, `culture.jpg`, `explore.jpg`, `approach.jpg`, `campus.jpg`
   - `public/gallery/`: `01.jpg` to `10.jpg` (scrolling gallery strip; captions in `GALLERY` in `src/data/site.js`)
4. **Map pin.** Google can't pin the full street address, so the map centres on Town Centre, CIDCO. For an exact pin, set `mapsQuery`/`mapsLink` from the client's Google Maps listing.
5. **Share preview.** Set `VITE_SITE_URL` in `.env` to the live address (e.g. `https://yourdomain.in`, no trailing slash) and rebuild; the link-preview tags in `index.html` use it. The preview image is `public/og-image.jpg` (1200×630, with the director's photo).

## Structure

```
src/data/site.js           contact config, nav, testimonials, PHOTOS + GALLERY slots
src/index.css              design tokens (colours, fonts, buttons)
src/components/Header.jsx  header + mobile menu
src/components/Hero.jsx    full-screen hero + scroll-expanding photo reel
src/components/Formula.jsx numbers band, scroll-lit Einstein quote, the three pillars
src/components/Worlds.jsx  six worlds (pinned horizontal scroll on desktop, swipe on mobile)
src/components/Story.jsx   director Soneeka Bagade + "what we measure" (words fill on scroll)
src/components/Approach.jsx "bike ride": pinned step counter + bike progress bar
src/components/Research.jsx research & discovery
src/components/Gallery.jsx  two-row scrolling photo strip
src/components/Voices.jsx   testimonials
src/components/Vision.jsx   full-bleed campus vision (parallax photo)
src/components/Contact.jsx  enquiry form → WhatsApp, call/WhatsApp cards, map
src/components/Footer.jsx   footer, mobile quick-action bar, floating WhatsApp
```

The enquiry form validates the name, class and a 10-digit mobile number. It then opens WhatsApp with a formatted message. Nothing is stored anywhere. Animations turn off automatically for visitors who use "reduce motion".
