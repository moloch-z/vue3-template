/* eslint-disable jsdoc/require-jsdoc */
import { Mesh, SphereGeometry, TextureLoader, MeshBasicMaterial } from 'three'
import Scene from './Scene'

const Sphere = defineComponent({
  name: 'Sphere',
  components: { Scene },
  props: {
    imgUrl: {
      type: String,
      required: true
    }
  },
  setup(props) {
    function handleInitFinsh(handleHooks: SceneHandle): void {
      const geometry = new SphereGeometry(5, 32, 32) // 节点数量越大,需要计算的三角形就越多,影响性能
      const loader = new TextureLoader() // 贴全景图

      loader.load(props.imgUrl, texture => {
        const material = new MeshBasicMaterial({ map: texture }) // 材质  map: texture 颜色贴图
        const sphere = new Mesh(geometry, material) // Mesh(geometry(几何体): Geometry, material(材质): Material ) 网格、构造器

        sphere.geometry.scale(1, 1, -1)
        handleHooks.scene.add(sphere)
      })

      // 添加控制器
      handleHooks.controls.enableDamping = true

      // 缩放范围
      handleHooks.controls.minDistance = 3
      handleHooks.controls.maxDistance = 8
      handleHooks.camera.position.z = 5
    }

    return (): JSX.Element => {
      return <Scene onInitFinsh={handleInitFinsh} />
    }
  }
})

export default Sphere
