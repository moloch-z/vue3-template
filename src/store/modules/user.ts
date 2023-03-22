import { defineStore } from 'pinia'
import router from '@/router'
import { login, getAppUserInfo } from '@/api'
import { userInfoSession, removeUserInfoSessionDB, apiTokenSession } from '@/utils'

export const useUserStore = defineStore('user', {
  state: () => {
    const userInfo = userInfoSession()
    return { userInfo, access_token: '' }
  },
  actions: {
    async login(data: FormData) {
      try {
        const loginRes = await login(data)

        apiTokenSession(loginRes.data.data)

        const userRes = await getAppUserInfo()
        this.userInfo = userRes.data.data
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    },
    logout(isJump?: boolean) {
      removeUserInfoSessionDB()
      const userInfo = userInfoSession()
      this.userInfo = userInfo
      if (isJump) {
        router.push('/login')
      }
    }
  }
})
