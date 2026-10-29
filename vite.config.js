import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const srcDir = path.resolve(process.cwd(), 'src')

// https://vite.dev/config/
export default defineConfig({
  logLevel: 'error', // Suppress warnings, only show errors
  plugins: [
    react(),
  ],
  resolve: {
    alias: [
      { find: /^@\//, replacement: `${srcDir}/` },
    ],
  },
});
