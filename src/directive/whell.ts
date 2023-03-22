import { isFunction } from '@/utils'

export default {
  mounted(el: HTMLElement, binding): void {
    const { value } = binding

    if (isFunction(value)) {
      el.addEventListener('wheel', value)
    } else {
      const { rollUp, rollDown } = value

      el.addEventListener('wheel', (event: WheelEvent) => {
        if (event.deltaY < 0) {
          rollUp?.(event)
        } else if (event.deltaY > 0) {
          rollDown?.(event)
        }
      })
    }
  }
}
