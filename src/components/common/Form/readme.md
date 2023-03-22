import { defineAsyncComponent } from 'vue'
import ErrorComponent from './components/ErrorComponent.vue'
import LoadingComponent from './components/LoadingComponent.vue'

// 不带选项的异步组件
const asyncPage = defineAsyncComponent(() => import('./NextPage.vue'))

// 带选项的异步组件 这个带选项的平时应该是使用的较少的
const asyncPageWithOptions = defineAsyncComponent({
loader: () => import('./NextPage.vue'),
delay: 200,
timeout: 3000,
errorComponent: ErrorComponent,
loadingComponent: LoadingComponent
})

https://cn.vuejs.org/guide/components/v-model.html

https://cn.vuejs.org/guide/extras/render-function.html#v-model
