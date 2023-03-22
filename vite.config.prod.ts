import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import externalGlobals from 'rollup-plugin-external-globals'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
import autoImport from 'unplugin-auto-import/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver as antDesignVueResolver } from 'unplugin-vue-components/resolvers'

const lifecycle = process.env.npm_lifecycle_event

const plugins = [
  autoImport({
    imports: ['vue', 'vue-router'],
    dts: 'types/auto-imports.d.ts',
    resolvers: [antDesignVueResolver()]
  }),
  components({
    dts: 'types/components.d.ts',
    // dirs 指定组件所在位置，默认为 src/components
    // 可以让我们使用自己定义组件的时候免去 import 的麻烦
    // dirs: ['src/components/'],
    // 配置需要将哪些后缀类型的文件进行自动按需引入
    extensions: ['vue', 'md'],
    resolvers: [antDesignVueResolver({ importStyle: true, resolveIcons: true })]
  }),
  vue(),
  vueJsx(),
  {
    ...externalGlobals({
      vue: 'Vue',
      dayjs: 'dayjs',
      axios: 'axios',
      'vue-router': 'VueRouter',
      'vue-i18n': 'VueI18n',
      three: 'THREE',
      'vue-demi': 'VueDemi',
      pinia: 'Pinia'
    }),
    enforce: 'post',
    apply: 'build'
  },
  viteCompression({
    verbose: true,
    disable: false,
    threshold: 1024000,
    algorithm: 'gzip',
    ext: '.gz'
  })
]

if (lifecycle === 'report') {
  plugins.push(visualizer({ open: true, brotliSize: true, filename: 'visualizer/report.html' }))
}
export default defineConfig({
  base: '/', // 打包路径
  define: {
    'process.env': process.env
  },
  plugins,
  // 配置别名
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  // 生产环境打包配置
  // 去除 console debugger
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      external: ['vue', 'axios', 'ant-design-vue', 'vue-demi', 'pinia', 'vue-i18n', 'three', 'vue-router'],
      output: {
        manualChunks: {
          // 'ant-design-vue': ['ant-design-vue'],
          'ant-design_icons-vue': ['@ant-design/icons-vue'],
          'vue-component': ['vue-dompurify-html']
        },
        // 资源也做分类
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      }
    }
  }
})
