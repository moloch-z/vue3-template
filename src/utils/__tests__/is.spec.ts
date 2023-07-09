import { isString } from '@/utils/is'

describe('isString function', () => {
  it('”“ is string', () => {
    expect(isString('')).toBe(true)
  })
})
