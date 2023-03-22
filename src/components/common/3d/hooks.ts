import { Scene, PerspectiveCamera, WebGL1Renderer } from 'three'

export interface SceneInitHandle {
  scene: Scene
  camera: PerspectiveCamera
  renderer: WebGL1Renderer
}

/**
 * 初始化 Scene 场景
 *
 * @returns {SceneInitHandle} SceneInitHandle
 */
export function useSceneInit(): SceneInitHandle {
  const scene = new Scene()
  const camera = new PerspectiveCamera(45, 1, 1, 1000)
  const renderer = new WebGL1Renderer()

  renderer.render(scene, camera)

  /**
   * 启动帧循环
   *
   * @returns {void}
   */
  function animation(): void {
    renderer.render(scene, camera)
    requestAnimationFrame(animation)
  }
  animation()
  return {
    scene,
    camera,
    renderer
  }
}
