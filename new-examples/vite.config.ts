import * as path from 'path'
import {cwd} from 'process'
import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import VueTypeImports from 'vite-plugin-vue-type-imports'
import AutoImport from 'unplugin-auto-import/vite'

// import {svgBuilder} from './svgBuilder'

export default defineConfig(({command, mode}) => {
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
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
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
      open: true,
      port: 8089
    },
    define: {
      __APP_VERSION__: JSON.stringify({name: 'vite-demo', version: '1.0.0'}),
      'process.env': process.env
    }
  }
})
