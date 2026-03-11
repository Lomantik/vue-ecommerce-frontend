import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isGithubPages = mode === 'github-pages'

  return {
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    base: isGithubPages ? '/vue-ecommerce-frontend/' : '/',
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          // additionalData: `@use "@/assets/styles/bootstrap-api.scss" as *;`,
          silenceDeprecations: ['global-builtin', 'import', 'if-function', 'color-functions'],
        },
      },
    },
  }
})
