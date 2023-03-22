import { isFunction } from '@/utils'

export default {
  mounted(el: HTMLElement, binding): void {
    const { value } = binding

    if (isFunction(value)) {
      el.addEventListener('resize', (ev: UIEvent) => {
        value(ev)
      })
    }
  }
}
