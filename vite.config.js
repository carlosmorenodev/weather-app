import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { config } from 'dotenv'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/weather-app/",
  define: {
    'process.env' : process .env
  }
})
