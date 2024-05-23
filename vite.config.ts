import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        // changeOrigin: true, //是否跨域
        // rewrite: (path) => path.replace(/^\/mis/, ""), //因为后端接口有mis前缀，所以不需要替换
        // ws: true,                       //是否代理 websockets
        // secure: true, //是否https接口
      },
    },
  },
})
