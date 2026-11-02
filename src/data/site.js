/* =====================================================================
   SITE CONFIG: edit these once and every button on the site updates.
   ===================================================================== */
export const SITE = {
  name: 'Superior Classes',
  whatsapp: '910000000000', // REPLACE: country code + number, digits only (e.g. 919876543210)
  phone: '+910000000000', // REPLACE: used by every "Call" button
  phoneDisplay: '', // optional, e.g. '+91 98765 43210'
  email: '', // optional, e.g. 'hello@superiorclasses.in'
  instagram: 'https://www.instagram.com/superior_classes_3/', // optional full URLs: icons appear in the footer when set
  facebook: '',
  youtube: '',
  address: ['Suraj Apartment, Opposite BSNL Office,', 'Town Center, Chhatrapati Sambhajinagar,', 'Maharashtra'],
  // Google can't pin the full street address, so the map centres on the neighbourhood.
  // For an exact pin, paste the client's Google Maps share link into mapsLink.
  mapsQuery: 'Town Centre, CIDCO, Chhatrapati Sambhajinagar, Maharashtra',
  mapsLink: '',
  greeting: 'Hello Superior Classes! 👋',
}

export const waLink = (text = `${SITE.greeting} I'd like to know more about Superior Classes.`) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`
export const telLink = `tel:${SITE.phone}`
export const directionsLink =
  SITE.mapsLink || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SITE.mapsQuery)}`
// `ll` centres the view slightly north of the place, because the iframe is shifted up 170px (to hide
// Google's place card) and this keeps the highlighted area in the middle of the visible map.
export const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}&ll=19.8822,75.3664&z=16&output=embed`

export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'worlds', label: 'Worlds' },
  { id: 'story', label: 'Our Story' },
  { id: 'approach', label: 'Approach' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
]

/* SAMPLE testimonials: replace with real words from students and parents before launch. */
export const TESTIMONIALS = [
  { name: 'Student', meta: 'Class 9', initial: 'A', color: '#FFB627', quote: 'I used to be scared of making mistakes. Here they are literally part of the lesson. Science finally makes sense!' },
  { name: 'Parent', meta: 'of a Class 8 student', initial: 'P', color: '#15A858', quote: 'Our daughter comes home excited to explain what she learned. Her confidence has grown so much this year.' },
  { name: 'Student', meta: 'Class 10', initial: 'R', color: '#4FB3F6', quote: 'We did the experiment instead of just reading the chapter. I still remember every single step.' },
  { name: 'Parent', meta: 'of a Class 11 student', initial: 'S', color: '#FF6B57', quote: 'They really pay attention to how each child learns. That personal attention made all the difference for us.' },
  { name: 'Student', meta: 'Class 7', initial: 'K', color: '#9B6BDE', quote: 'Art, sports AND maths in one place? Honestly the best part of my week.' },
  { name: 'Parent', meta: 'of a Class 9 student', initial: 'M', color: '#1D4078', quote: 'Values, discipline and fun together. Exactly what we were looking for in a learning space.' },
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
  hero: { src: `${T}/group-circle.jpg`, label: 'Students in a group session', word: 'Learn', pos: '50% 60%' },
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

/* Gallery strip (2 rows of 5). Temporary photos repeat with different crops. */
export const GALLERY = [
  { src: `${T}/science-lab.jpg`, caption: 'Lab day', word: 'Lab', pos: '50% 45%' },
  { src: `${T}/craft-workshop.jpg`, caption: 'Craft workshop', word: 'Art', pos: '30% 50%' },
  { src: `${T}/board-games.jpg`, caption: 'Game time', word: 'Play', pos: '50% 60%' },
  { src: `${T}/group-circle.jpg`, caption: 'Circle time', word: 'Together', pos: '45% 65%' },
  { src: `${T}/teacher-demo.jpg`, caption: 'Concept corner', word: 'Learn', pos: '40% 40%' },
  { src: `${T}/teacher-demo.jpg`, caption: 'Curious minds', word: 'Ask', pos: '85% 50%' },
  { src: `${T}/group-circle.jpg`, caption: 'Group discussion', word: 'Talk', pos: '80% 60%' },
  { src: `${T}/craft-workshop.jpg`, caption: 'Build it yourself', word: 'Build', pos: '85% 60%' },
  { src: `${T}/science-lab.jpg`, caption: 'Experiment in progress', word: 'Test', pos: '20% 50%' },
  { src: `${T}/board-games.jpg`, caption: 'Teamwork', word: 'Team', pos: '20% 50%' },
]
