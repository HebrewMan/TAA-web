import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import path  from "path";
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    }
  },
   plugins: [
    UnoCSS({
      shortcuts: [
        { logo: 'i-logos-react w-6em h-6em transform transition-800 hover:rotate-180' },
      ],
    }),
    react(),
  ],
 
  server: {
    //使用IP能访问
      host: '0.0.0.0'
  }  

})
