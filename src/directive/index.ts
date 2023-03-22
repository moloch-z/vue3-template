import type { App } from 'vue'
import resize from './resize'
import wheel from './whell'

export default {
  install(app: App): void {
    app.directive('resize', resize)
    app.directive('wheel', wheel)
  }
}
