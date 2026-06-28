import { describe, it, expect, beforeEach } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import api from './api'

let mock: MockAdapter

beforeEach(() => {
  mock = new MockAdapter(api)
})

afterEach(() => {
  mock.restore()
})

describe('api response interceptor', () => {
  it('unwraps success envelope', async () => {
    mock.onPost('/test').reply(201, { success: true, data: { accessToken: 'abc' } })

    const { data } = await api.post('/test')
    expect(data).toEqual({ accessToken: 'abc' })
  })

  it('does not unwrap plain responses', async () => {
    mock.onPost('/test').reply(200, { foo: 'bar' })

    const { data } = await api.post('/test')
    expect(data).toEqual({ foo: 'bar' })
  })
})
