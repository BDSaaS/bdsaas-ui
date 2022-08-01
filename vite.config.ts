import * as path from 'path'
import { cwd } from 'process'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import VueTypeImports from 'vite-plugin-vue-type-imports'
import AutoImport from 'unplugin-auto-import/vite'

import { svgBuilder } from './svgBuilder'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, cwd())
  console.log(
    `command:${command}`,
    `mode:${mode}`,
    `env:${JSON.stringify(env)}`
  )

  return {
    plugins: [
      vue(),
      DefineOptions(),
      VueTypeImports(),
      AutoImport({
        imports: ['vue', 'pinia'],
        dts: 'src/auto-imports.d.ts',
        dirs: ['src/store', 'bd-tools/utils'],
        eslintrc: {
          enabled: true
        },
        vueTemplate: true
      }),
      svgBuilder('./src/assets/svgs/')
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: "@import './src/assets/css/common.less';"
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@tools': path.resolve(__dirname, 'bd-tools')
      }
    },
    server: {
      open: true
    },
    define: {
      __APP_VERSION__: JSON.stringify({ name: 'vite-demo', version: '1.0.0' }),
      'process.env': process.env
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/components/index.ts'),
        name: 'BDSaasUI',
        fileName: format => `bdsaas-ui.${format}.js`
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ['vue'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue'
          }
        }
      }
    }
  }
})
