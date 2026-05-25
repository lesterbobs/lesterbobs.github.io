import { defineConfig } from 'vite'
import { resolve } from 'path'
import { readdirSync, existsSync } from 'fs'
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

export default defineConfig({
  plugins: [react()],
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
