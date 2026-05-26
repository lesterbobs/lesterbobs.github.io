import { defineConfig } from 'vite'
import { resolve } from 'path'
import { readdirSync, existsSync, mkdirSync, copyFileSync, statSync } from 'fs'
import react from '@vitejs/plugin-react'

function projectEntries() {
  const projectsDir = resolve(__dirname, 'projects')
  const entries = {}
  for (const entry of readdirSync(projectsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const html = resolve(projectsDir, entry.name, 'index.html')
    if (existsSync(html)) entries[entry.name] = html
  }
  return entries
}

// Copies non-HTML files at the top level of each projects/<name>/ directory into
// dist/projects/<name>/ during build. Vite skips assets that aren't referenced
// from a module graph (e.g. <script src="bundle.js"> without type="module", or
// runtime-fetched data files like cedict_ts.u8), so we copy them ourselves.
// Subdirectories (e.g. css/) are left alone — those are processed via the HTML.
function copyProjectStaticAssets() {
  return {
    name: 'copy-project-static-assets',
    apply: 'build',
    closeBundle() {
      const projectsDir = resolve(__dirname, 'projects')
      const outDir = resolve(__dirname, 'dist', 'projects')
      for (const entry of readdirSync(projectsDir, { withFileTypes: true })) {
        if (!entry.isDirectory()) continue
        const srcDir = resolve(projectsDir, entry.name)
        const dstDir = resolve(outDir, entry.name)
        if (!existsSync(resolve(srcDir, 'index.html'))) continue
        mkdirSync(dstDir, { recursive: true })
        for (const file of readdirSync(srcDir)) {
          if (file === 'index.html') continue
          const s = resolve(srcDir, file)
          if (!statSync(s).isFile()) continue
          copyFileSync(s, resolve(dstDir, file))
        }
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), copyProjectStaticAssets()],
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...projectEntries(),
      },
    },
  },
})
