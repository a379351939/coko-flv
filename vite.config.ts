import { defineConfig } from 'vite'
const path = require('path')

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.js'),
      name: 'CokoFlv',
      fileName: (format) => `coko-flv.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          react: 'React'
        }
      }
    }
  }
})
