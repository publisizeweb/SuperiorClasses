/* =====================================================================
   SITE CONFIG: edit these once and every button on the site updates.
   ===================================================================== */
export const SITE = {
  name: 'Superior Classes',
  whatsapp: '919923096903', // country code + number, digits only: used by every WhatsApp button and the enquiry form
  phone: '+919923096903', // used by every "Call" button
  phoneDisplay: '+91 99230 96903', // shown next to the Call buttons
  email: 'soneeka@superiorclasses.in', // shown in the footer
  instagram: 'https://www.instagram.com/superior_classes_3/', // optional full URLs: icons appear in the footer when set
  facebook: '',
  youtube: '',
  directorLinkedin: 'https://www.linkedin.com/in/soneekabagade/', // under the director's bio in Our Story + footer icon
  address: ['Suraj Apartment,', 'Opposite BSNL Office,', 'Town Center,', 'Chhatrapati Sambhajinagar,', 'Maharashtra'], // one entry per line in the footer
  // Exact pin for the embedded map: the Suraj Palace (G-4/1, Town Centre, CIDCO) listing on Google Maps.
  mapsLat: 19.8772872,
  mapsLng: 75.361857,
  mapsQuery: 'Suraj Palace, Town Centre, CIDCO, Chhatrapati Sambhajinagar, Maharashtra 431003',
  mapsLink: 'https://maps.app.goo.gl/8jJu9Ga5iSnfLRx79',
  greeting: 'Hello Superior Classes! 👋',
}

export const waLink = (text = `${SITE.greeting} I'd like to know more about Superior Classes.`) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`
export const telLink = `tel:${SITE.phone}`
export const directionsLink =
  SITE.mapsLink || `https://www.google.com/maps/dir/?api=1&destination=${SITE.mapsLat},${SITE.mapsLng}`
// The iframe is shifted up 170px (to hide Google's place card), so the visible area's middle is 85px
// below the map's centre. Centring the map 85px north of the pin puts the pin in the middle of what you see.
const MAP_ZOOM = 17
const latPerPx = (360 / (256 * 2 ** MAP_ZOOM)) * Math.cos((SITE.mapsLat * Math.PI) / 180)
const mapCentreLat = (SITE.mapsLat + 85 * latPerPx).toFixed(6)
export const mapEmbedSrc = `https://maps.google.com/maps?q=${SITE.mapsLat},${SITE.mapsLng}&ll=${mapCentreLat},${SITE.mapsLng}&z=${MAP_ZOOM}&output=embed`

export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'story', label: 'Our Story' },
  { id: 'approach', label: 'Approach' },
  { id: 'contact', label: 'Contact' },
]

/* =====================================================================
   PHOTOS
   TEMPORARY: these use the five placeholder photos in /public/photos/temp/.
   When the client's real photos arrive, put them in /public/photos/ and
   change each `src` below (e.g. '/photos/hero.jpg').
   `pos` = which part of the photo stays visible when it is cropped.
   ===================================================================== */
const T = '/photos/temp'
export const PHOTOS = {
  hero: { src: '/photos/students-group.jpg', label: 'Superior Classes students and teachers in a group photo', word: 'Learn', pos: '50% 72%' },
  heroMain: { src: `${T}/science-lab.jpg`, label: 'Students doing a science experiment', word: 'Lab', pos: '50% 40%' },
  heroSide: { src: `${T}/craft-workshop.jpg`, label: 'Hands-on craft workshop', word: 'Create', pos: '35% 50%' },
  heroSmall: { src: `${T}/board-games.jpg`, label: 'Students playing games together', word: 'Play', pos: '50% 55%' },
  academics: { src: `${T}/teacher-demo.jpg`, label: 'Teacher explaining a concept', word: 'Study', pos: '45% 35%' },
  science: { src: `${T}/science-lab.jpg`, label: 'Students doing a science experiment', word: 'Lab', pos: '50% 40%' },
  art: { src: `${T}/craft-workshop.jpg`, label: 'Hands-on craft workshop', word: 'Create', pos: '50% 45%' },
  sports: { src: `${T}/board-games.jpg`, label: 'Students playing games together', word: 'Play', pos: '50% 55%' },
  culture: { src: `${T}/group-circle.jpg`, label: 'Group activity in the classroom', word: 'Roots', pos: '30% 60%' },
  explore: { src: `${T}/craft-workshop.jpg`, label: 'Building and exploring', word: 'Explore', pos: '80% 50%' },
  approach: { src: `${T}/science-lab.jpg`, label: 'Hands-on activity', word: 'Do', pos: '50% 50%' },
  campus: { src: `${T}/board-games.jpg`, label: 'Learning outdoors', word: 'Campus', pos: '50% 35%' },
}
