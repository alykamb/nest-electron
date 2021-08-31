import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    port: 3002,
    host: 'localhost',
    hmr: {
        host: 'localhost',
        port: 3002,
        protocol: 'ws',
    },
},
build: {
    // generate manifest.json in outDir
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: '/path/to/main.js'
    }
  }
})
