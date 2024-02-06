import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    dir: './src',
    coverage: {
      exclude: [
        '**/node_modules/**',
        '**/.next/**',
        '**/*.d.ts',
        '*.config.js',
        '*.config.ts',
        '**/env.mjs',
        '**/config/*.ts',
        '**/index.ts',
        '**/page.tsx',
        '**/layout.tsx',
        '**/error.tss',
        '**/loadign.tss',
      ],
      reporter: ['lcov', 'text'],
    },
  },
})
