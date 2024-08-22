import { defineConfig } from 'vite';
import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 're-audio',
      fileName: 're-audio',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  plugins: [
    react(),
    dts({
      outDir: 'dist',
      rollupTypes: true,
      tsconfigPath: './tsconfig.app.json',
      exclude: ['src/*.tsx', 'node_modules/**'],
      beforeWriteFile: (_, content) => ({
        content: content
          .replace(/AudioContext_2/g, 'AudioContext')
          .replace(/Audio_2\s*as\s*/g, '')
          .replace(/Audio_2/g, 'Audio')
          .replace(/as\s*JSX_2\s*/g, '')
          .replace(/JSX_2/g, 'JSX'),
      }),
    }),
  ],
});
