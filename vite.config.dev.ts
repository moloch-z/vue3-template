import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import autoImport from 'unplugin-auto-import/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver as antDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  base: './', // 打包路径
  define: {
    'process.env': process.env
  },
  plugins: [
    // 自动导入使用的`vue`、`vue-router`等依赖
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
    vueJsx()
  ],
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
  // 启动服务配置
  server: {
    host: '0.0.0.0',
    port: 8000,
    open: true,
    https: false,
    proxy: {
      '/dev.com': {
        target: 'http://dev.com',
        changeOrigin: true,
        rewrite: p => p.replace(/^\/dev.com/, '')
      }
    }
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  optimizeDeps: {
    include: [
      'three',
      'dayjs',
      'ant-design-vue',
      'ant-design-vue/es',
      'ant-design-vue/es/modal/style/css',
      'ant-design-vue/es/popover/style/css',
      'ant-design-vue/es/form/style/css',
      'ant-design-vue/es/radio/style/css',
      'ant-design-vue/es/button/style/css',
      'ant-design-vue/es/input/style/css',
      'ant-design-vue/es/select/style/css',
      'ant-design-vue/es/cascader/style/css',
      'ant-design-vue/es/upload/style/css',
      'ant-design-vue/es/date-picker/style/css',
      'vue',
      'pinia',
      'axios',
      '@ant-design/icons-vue',
      'vue-i18n',
      'vue-router'
    ]
  }
})
