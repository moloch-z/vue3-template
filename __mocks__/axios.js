// import { loginUrl, getUserInfoUrl } from '@/api'

const mockAxios = jest.genMockFromModule('axios')
mockAxios.create = jest.fn(() => mockAxios)
mockAxios.get = jest.fn(() => Promise.resolve({ data: {} }))
mockAxios.post = jest.fn(() => Promise.resolve({ data: {} }))
mockAxios.put = jest.fn(() => Promise.resolve({ data: {} }))
mockAxios.delete = jest.fn(() => Promise.resolve({ data: {} }))
mockAxios.all = jest.fn(() => Promise.resolve())

// const response = {
//   code: 0,
//   msg: 'ok',
//   data: null
// }
mockAxios.get.mockResolvedValue(url => {
  switch (url) {
    case getUserInfoUrl:
      return {
        code: 0,
        msg: 'ok',
        data: {
          id: 11111,
          userName: 'test'
        }
      }

    default:
      return response
  }
})
mockAxios.post.mockResolvedValue(url => {
  switch (url) {
    case loginUrl:
      return {
        code: 0,
        msg: 'ok',
        data: {
          access_token: 'access_token',
          expires_in: 12345
        }
      }

    default:
      return response
  }
})

export default mockAxios
