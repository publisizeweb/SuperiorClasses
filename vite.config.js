import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Two pages: "/" is the public "under construction" page; the real site lives at a private path
// that is only shared with the client (never linked from "/"). At launch, move that index.html back to the root.
const PREVIEW_DIR = 'sc-preview-5x62jce2rg'

// "/sc-preview-…" (no trailing slash) would fall back to the construction page; send it to "/sc-preview-…/"
const addSlash = (req, res, next) => {
  const [path, query] = req.url.split('?')
  if (path !== `/${PREVIEW_DIR}`) return next()
  res.statusCode = 301
  res.setHeader('Location', `/${PREVIEW_DIR}/${query ? `?${query}` : ''}`)
  res.end()
}
const previewSlash = {
  name: 'preview-trailing-slash',
  configureServer(server) {
    server.middlewares.use(addSlash)
  },
  configurePreviewServer(server) {
    server.middlewares.use(addSlash)
  },
}

export default defineConfig({
  plugins: [previewSlash, react(), tailwindcss()],
  server: { port: 5190, strictPort: true, host: '127.0.0.1' },
  // `npm run preview` serves the production build; allow public tunnel hostnames for client previews
  preview: { port: 4173, strictPort: true, host: '127.0.0.1', allowedHosts: ['.trycloudflare.com', '.ngrok-free.app', '.loca.lt'] },
  build: {
    rollupOptions: {
      input: { construction: 'index.html', site: `${PREVIEW_DIR}/index.html` },
    },
  },
})
