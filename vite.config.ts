import { resolve } from 'node:path'
import { defineConfig, type Connect, type Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

/** Content pages, each built from <name>/index.html. */
const PAGES = ['privacy', 'terms', 'contact', 'faq', 'delete-account']

const page = (name: string) => resolve(__dirname, name, 'index.html')

/**
 * The dev and preview servers fall back to the landing page for any URL that
 * isn't a file, so "/privacy" (no trailing slash) showed the landing page.
 * Redirect it to "/privacy/", which serves privacy/index.html.
 */
const trailingSlashPages = (): Plugin => {
  const redirect: Connect.NextHandleFunction = (req, res, next) => {
    const [path, query = ''] = (req.url ?? '').split('?')
    const name = path.replace(/^\//, '')
    if (PAGES.includes(name)) {
      res.statusCode = 301
      res.setHeader('Location', `/${name}/${query ? `?${query}` : ''}`)
      res.end()
      return
    }
    next()
  }
  return {
    name: 'trailing-slash-pages',
    configureServer: (server) => void server.middlewares.use(redirect),
    configurePreviewServer: (server) => void server.middlewares.use(redirect),
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    trailingSlashPages(),
  ],
  build: {
    // Each page is its own HTML file (/privacy/index.html …), so
    // loveping.net/privacy/ works on any static host without rewrites.
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...Object.fromEntries(PAGES.map((p) => [p, page(p)])),
      },
    },
  },
})
