import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import pxToViewport from 'postcss-px-to-viewport-8-plugin'

export default defineConfig({
  // 如果您部署到 https://<USERNAME>.github.io/<REPO>/，请将此处修改为您真实的仓库名
  // 例如：仓库名为 my-project，则 base 设置为 '/my-project/'
  // 如果使用 GitHub Actions 自动部署，我们可以利用环境变量动态获取仓库名
  base: process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/` : '/',
  plugins: [react(), tailwindcss()],
  css: {
    postcss: {
      plugins: [
        pxToViewport({
          viewportWidth: 390,
          unitPrecision: 5,
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
          minPixelValue: 1,
          mediaQuery: false,
          exclude: [/node_modules/],
        }),
      ],
    },
  },
})
