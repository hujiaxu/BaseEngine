import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      // 指定库的入口文件
      entry: 'src/index.ts',
      // 定义库的全局名称（UMD/IIFE 模式下使用）
      name: 'CesiumGlbLoader',
      // 根据模块格式生成对应的文件名
      fileName: (format) => `index.${format}.js`,
      // 输出格式：这里生成 ESM 和 UMD 格式的包
      formats: ['es', 'umd']
    },
    rollupOptions: {
      // 如果库依赖外部模块，可以在 external 中列出
      external: ['cesium'],
      // output: {
      //   globals: {
      //     vue: 'Vue'
      //   }
      // }
    }
  }
})
