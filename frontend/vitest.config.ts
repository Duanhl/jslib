// @ts-ignore
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
    test: {
        environment: 'jsdom',
        testTimeout: -1,
        include: ['**/*.test.ts']
    }
})
