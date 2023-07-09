import mockAxios from '_/axios'
import { userInfoSession } from '@/utils'
import { shallowMountComponent } from '@/utils/test-utils'
import SwitchLogin from '@/components/common/SwitchLogin.vue'

describe('SwitchLogin vue compoment', () => {
  beforeEach(() => {
    mockAxios.post.mockResolvedValue(() => {
      return Promise.resolve({
        code: 0,
        msg: 'ok',
        data: {
          access_token: 'access_token',
          expires_in: 12345
        }
      })
    })

    // const user = useUserStore()
    userInfoSession(JSON.stringify({ id: 0, userName: 'test' }))
    // apiTokenSession({ access_token: 'test', expires_in: 10000000 })
  })
  test('测试登出', async () => {
    const wrapper = shallowMountComponent(SwitchLogin)
    expect(userInfoSession().userName).toContain('test')

    await wrapper.vm.handleMenuClick({ key: 'logout' })

    expect(userInfoSession().userName).toContain('init test')
  })
})
