import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
import { resolve } from "path";

import pxtovw from "postcss-px-to-viewport";
const loder_pxtovw = pxtovw({
  //这里是设计稿宽度 自己修改
  viewportWidth: 375,
  viewportUnit: "vw",
});
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: {
      // plugins: [loder_pxtovw]
    },
  },
  plugins: [
    UnoCSS({
      shortcuts: [
        {
          logo: "i-logos-react w-6em h-6em transform transition-800 hover:rotate-180",
        },
      ],
    }),
    react(),
  ],

  server: {
    proxy: {
      "/api": {
        target: "https://baidu.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    host: "0.0.0.0",
    open: true, // 自动打开浏览器
  },
});
