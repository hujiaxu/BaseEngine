import { defineConfig } from 'vite'
import { resolve } from 'path'
import fg from 'fast-glob'

// 使用 fast-glob 获取 workers 目录下所有 .ts 文件
const workerFiles = fg.sync('src/workers/*.ts')

// 构造输入对象，key 为文件名（不含后缀），value 为文件的绝对路径
const inputEntries = workerFiles.reduce((entries, file) => {
  const name = file.split('/').pop()?.replace(/\.ts$/, '')
  if (name) {
    entries[name] = resolve(__dirname, file)
  }
  return entries
}, {} as Record<string, string>)

export default defineConfig({
  build: {
    // 这里不使用 library 模式，而是常规构建配置
    rollupOptions: {
      input: inputEntries,
      output: {
        // 输出文件名根据入口名称生成，比如 worker1.js, worker2.js
        entryFileNames: '[name].js'
      }
    },
    // 指定输出目录，比如 dist/workers
    outDir: 'workers'
  }
})
