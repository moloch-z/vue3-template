import type { ObjectDirective } from 'vue'
import type { SceneInitHandle } from './hooks'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export interface SceneHandle extends SceneInitHandle {
  controls: OrbitControls
}
/**
 * 挂载
 *
 * @param {SceneHandle} handle SceneHandle
 * @param {Function} finshCallback SceneHandle
 * @returns {ObjectDirective} vue ObjectDirective
 */
export function withSceneInitDirective(handle: SceneHandle, finshCallback?: () => void): ObjectDirective {
  return {
    beforeMount(el: HTMLElement): void {
      el.appendChild(handle.renderer.domElement)
      handle.controls = new OrbitControls(handle.camera, el)
      finshCallback?.()
    },
    mounted(el: HTMLElement): void {
      handle.camera.aspect = el.offsetWidth / el.offsetHeight
      handle.camera.updateProjectionMatrix()
      handle.renderer.setSize(el.offsetWidth, el.offsetHeight)
    }
  }
}
