import { defineConfig } from 'vitest/config';

export default defineConfig({
  esbuild: { jsx: 'automatic' },
  test: {
    environment: 'jsdom',
    // Bật globals để @testing-library/react tự dọn DOM giữa các test.
    globals: true,
    include: ['src/**/*.test.{js,jsx}'],
  },
});
