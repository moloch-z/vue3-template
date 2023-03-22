/* eslint-disable jsdoc/require-jsdoc */
import type { SceneHandle } from './directive'
import Scene from './Scene'
import { EquirectangularRefractionMapping, ACESFilmicToneMapping } from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader' // 色调渲染器

const Hrd3D = defineComponent({
  name: 'Hrd3D',
  components: { Scene },
  props: {
    imgUrl: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const sceneHandle = ref<SceneHandle>()

    function initHdr(imgUrl: string) {
      if (!sceneHandle.value) {
        return
      }
      const handle = sceneHandle.value
      console.log('imgUrl', imgUrl)

      new RGBELoader().load(imgUrl, texture => {
        // 映射场景（球状体里面）
        texture.mapping = EquirectangularRefractionMapping

        // 色调映射-电影级别
        handle.renderer.toneMapping = ACESFilmicToneMapping

        // 色调映射的曝光级别
        handle.renderer.toneMappingExposure = 3

        // 场景背景添加纹理
        handle.scene.background = texture
        // 场景环境添加纹理
        handle.scene.environment = texture
      })
      handle.camera.position.set(1, 1, 1)
      // 添加控制器
      handle.controls.enableDamping = true
      // 设置像素比(定义为浏览器的缩放比)
      handle.renderer.setPixelRatio(window.devicePixelRatio)
      // 缩放范围
      handle.controls.minDistance = 3
      handle.controls.maxDistance = 8
    }

    function handleInitFinsh(handleHooks: SceneHandle): void {
      sceneHandle.value = handleHooks
      initHdr(props.imgUrl)
    }

    watch(
      () => props.imgUrl,
      imgUrl => {
        initHdr(imgUrl)
      }
    )

    return (): JSX.Element => {
      return <Scene onInitFinsh={handleInitFinsh} />
    }
  }
})

export default Hrd3D
