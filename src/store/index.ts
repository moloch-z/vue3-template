import { createPinia } from 'pinia'

const pinia = createPinia()

export * from './modules/user'
export * from './modules/i18n'

export default pinia
