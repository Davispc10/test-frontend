/// <reference types="vitest" />

import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [],
  resolve: {
    alias: [{ find: '@', replacement: path.join(__dirname, 'src') }],
  },

  test: {
    globals: true,
    clearMocks: true,
    mockReset: true,
    environment: 'happy-dom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      reporter: ['text', 'json', 'html'],
      all: true,
      include: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.stories.tsx',
        '!src/pages/**/*.{ts,tsx}',
        '!src/styles/**/*.ts',
        '!src/types/**/*.d.ts',
        '!src/**/*.mock.ts',
        '!src/test/test-utils/**/*.{ts,tsx}',
        '!src/test/setup.ts',
      ],
    },
    exclude: [
      'src/env/**',
      'src/test/test-utils/**',
      '**/node_modules/**',
      '**/dist/**',
      '**/e2e/**',
      '**/.storybook/**',
      '**/coverage/**',
      '**/.{idea,git,cache,output,temp}/**',
    ],
    env: {},
  },
})
