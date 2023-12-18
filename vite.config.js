import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { copy } from 'vite-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    copy({
      targets: [
        {
          src: 'node_modules/msw/lib/iife/index.js',
          dest: 'public/',
          rename: 'mockServiceWorker.js'
        }
      ],
      hook: 'writeBundle' // Importante: asegúrate de que se copie después de que se escriba el bundle
    })
  ]
})
