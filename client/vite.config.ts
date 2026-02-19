import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {analyzer} from "vite-bundle-analyzer"

// https://vite.dev/config/
  export default defineConfig({
    plugins: [react(
      {
      babel: {
        plugins: ["babel-plugin-react-compiler"]
      }
    }
    ),tailwindcss(),analyzer()],
    server: {
      proxy: {
        "/api": {
          target: "https://quick-show-u9uu.onrender.com/",
          changeOrigin: true,
        },
      },
    },
    build:{
      ssr:true
    }
  })
