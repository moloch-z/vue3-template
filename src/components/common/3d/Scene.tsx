import type { SceneHandle } from './directive'
import { withDirectives } from 'vue'
import { getSlot } from '@/utils/component'
import { useSceneInit } from './hooks'
import { withSceneInitDirective } from './directive'
import '@/assets/style/scene.less'

const Scene = defineComponent({
  name: 'Scene',
  emits: { initFinsh: (_handle: SceneHandle) => {} },
  setup(props, { slots, emit }) {
    const defaultSolt = getSlot(slots)
    const handleHooks = useSceneInit() as SceneHandle
    const sceneInitDirective = withSceneInitDirective(handleHooks, () => {
      emit('initFinsh', handleHooks)
    })

    return (): JSX.Element => {
      return withDirectives(
        <div className="scene-container" {...props}>
          {defaultSolt}
        </div>,
        [[sceneInitDirective]]
      )
    }
  }
})

export default Scene
