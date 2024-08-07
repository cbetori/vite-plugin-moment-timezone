import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*'],
    coverage: {
      provider: 'v8',
      all: true,
      include: ['src/**/*'],
      reporter: ['text-summary'],
      thresholds: {
        lines: 0,
        functions: 0,
        branches: 0,
        statements: 0,
      },
    },
  },
});
