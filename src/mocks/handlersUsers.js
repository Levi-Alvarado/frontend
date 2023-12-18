import { http, HttpResponse } from 'msw'
import { ENDPOINTS } from '../Constants'

export const handlersUsers = [
  http[ENDPOINTS.login.method](ENDPOINTS.login.path, async ({ request }) => {
    const { email, password } = await request.json()

    console.log('🦄 -> { email, password }', { email, password })
    if (email !== 'john@asd.cl') {
      return new Response(null, {
        status: 400,
        ok: false,
        statusText: 'Email or password incorrect'
      })
    }
    if (password !== '123456') {
      return new Response(null, {
        status: 400,
        ok: false,
        statusText: 'Email or password incorrect'
      })
    }
    const jwt = '1234567890'
    return HttpResponse.json({
      user: {
        id: 1,
        name: 'John Maverick',
        email: 'john@asd.cl'
      },
      token: jwt
    })
  })
]
