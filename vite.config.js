import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5173, strictPort: true, host: '127.0.0.1' },
  // `npm run preview` serves the production build; allow public tunnel hostnames for client previews
  preview: { port: 4173, strictPort: true, host: '127.0.0.1', allowedHosts: ['.trycloudflare.com', '.ngrok-free.app', '.loca.lt'] },
})
