import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // מאפשר שימוש ב DESCRIBE IT EXPECT ללא IMPORT
    environment: "jsdom", // מספק DOM וירטואלי,
    setupFiles: "./src/setupTests.js"
  }
})
