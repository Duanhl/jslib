// @ts-ignore
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  test: {
    environment: 'node',
    testTimeout: -1,
    include: ['**/*.test.ts']
  }
})
