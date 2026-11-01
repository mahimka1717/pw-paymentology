import { readdirSync, rmSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Finder leaves .DS_Store files in public/, and Vite would copy them into the build.
function stripDsStore(): Plugin {
  let outDir = 'dist'
  return {
    name: 'strip-ds-store',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      for (const file of readdirSync(outDir, { recursive: true }) as string[]) {
        if (file.endsWith('.DS_Store')) rmSync(join(outDir, file))
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), stripDsStore()],
  // Relative asset URLs, so the build runs from any path on the hub (see README).
  base: './',
  server: {
    host: true,
  },
})
