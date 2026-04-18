import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolvePortfolioManifest } from './scripts/portfolio-manifest.mjs';

export default defineConfig(({ command }) => {
  const manifest = resolvePortfolioManifest();

  return {
    plugins: [react()],
    base: command === 'build' ? manifest.deployPath : '/',
    build: {
      outDir: manifest.outputDir,
      emptyOutDir: true,
    },
  };
});
