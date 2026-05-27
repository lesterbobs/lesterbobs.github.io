import { defineConfig } from 'vite'
import { resolve } from 'path'
import { readdirSync, existsSync, mkdirSync, copyFileSync } from 'fs'

function projectEntries() {
  const projectsDir = resolve(__dirname, 'projects')
  const entries = {}
  // Projects whose HTML is pre-built by their own Vite config (relative paths,
  // hashed assets) are copied as-is by copyProjectStaticAssets and should NOT
  // be processed by Vite again.
  const prebuilt = new Set(['language_game'])
  for (const entry of readdirSync(projectsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    if (prebuilt.has(entry.name)) continue
    const html = resolve(projectsDir, entry.name, 'index.html')
    if (existsSync(html)) entries[entry.name] = html
  }
  return entries
}

// Recursively copy a directory.
function copyDirRecursive(src, dst) {
  mkdirSync(dst, { recursive: true })
  for (const entry of readdirSync(src, { withFileTypes: true })) {
    const s = resolve(src, entry.name)
    const d = resolve(dst, entry.name)
    if (entry.isDirectory()) {
      copyDirRecursive(s, d)
    } else {
      copyFileSync(s, d)
    }
  }
}

// Copies each projects/<name>/ directory into dist/projects/<name>/.
// For projects processed by Vite (in rollupOptions.input), Vite handles
// index.html and referenced assets; this plugin copies the rest (e.g.
// cedict_ts.u8, bundle.js). For pre-built projects (e.g. language_game),
// this copies everything including the pre-built index.html and assets/.
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
        if (!existsSync(resolve(srcDir, 'index.html'))) continue
        const dstDir = resolve(outDir, entry.name)
        copyDirRecursive(srcDir, dstDir)
      }
    },
  }
}

export default defineConfig({
  plugins: [copyProjectStaticAssets()],
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
