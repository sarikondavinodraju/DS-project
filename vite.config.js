import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BASE_PATH lets the same build work both locally ("/") and when published
// under a sub-path such as GitHub Pages ("/DS-project/").
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()]
})
