import type { App } from 'vue'
import Hdr from './common/3d/Hdr'
import Scene from './common/3d/Scene'
import Sphere from './common/3d/Sphere'
import BaseForm from './common/Form/BaseForm'
import LoginForm from './login/LoginForm.vue'
import FilterForm from './common/Form/FilterForm'
import SwitchLogin from './common/SwitchLogin.vue'
import SwitchLocale from './common/SwitchLocale.vue'

export default {
  install(app: App): void {
    app.component('Hdr', Hdr)
    app.component('Scene', Scene)
    app.component('Sphere', Sphere)
    app.component('BaseForm', BaseForm)
    app.component('LoginForm', LoginForm)
    app.component('FilterForm', FilterForm)
    app.component('SwitchLogin', SwitchLogin)
    app.component('SwitchLocale', SwitchLocale)
  }
}
