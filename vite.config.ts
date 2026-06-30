import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/async-race-fr/',
  plugins: [react()],
  resolve:{
    alias: {
      api:"./src/api",
      asserts:"./src/asserts",
      components:"./src/components",
      hooks:"./src/hooks",
      pages:"./src/pages",
      store:"./src/store",
      types:"./src/types",
      utils:"./src/utils",
    }
  }
})
