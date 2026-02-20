import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

const SPA_LANG_CODES = new Set(['en', 'zh', 'ja', 'ko'])
const SPA_SUB_ROUTES = new Set(['quiz', 'result'])

function shouldBypassPublicDirectoryIndex(pathname: string) {
  const normalizedPath = pathname.replace(/^\/+/, '').replace(/\/+$/, '')
  if (!normalizedPath) {
    return true
  }

  const segments = normalizedPath.split('/')
  if (segments.length === 2 && SPA_LANG_CODES.has(segments[0]) && SPA_SUB_ROUTES.has(segments[1])) {
    return true
  }

  return false
}

function servePublicDirectoryIndexInDev() {
  return {
    name: 'serve-public-directory-index-in-dev',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if ((req.method !== 'GET' && req.method !== 'HEAD') || !req.url) {
          next()
          return
        }

        const { pathname } = new URL(req.url, 'http://localhost')
        if (!pathname || pathname === '/' || pathname.includes('/@')) {
          next()
          return
        }

        const hasExtension = path.posix.extname(pathname) !== ''
        const normalizedPath = pathname.replace(/^\/+/, '').replace(/\/+$/, '')
        if (!normalizedPath || (hasExtension && !pathname.endsWith('.html'))) {
          next()
          return
        }

        if (shouldBypassPublicDirectoryIndex(pathname)) {
          next()
          return
        }

        const htmlFilePath = path.join(server.config.publicDir, normalizedPath, 'index.html')
        if (!fs.existsSync(htmlFilePath) || !fs.statSync(htmlFilePath).isFile()) {
          next()
          return
        }

        const html = fs.readFileSync(htmlFilePath, 'utf-8')
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(html)
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), servePublicDirectoryIndexInDev()],
  server: {
    headers: {
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
  test: {
    environment: 'node',
  },
})
