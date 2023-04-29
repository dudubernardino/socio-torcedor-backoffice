import { toast } from 'react-toastify'
import Router from 'next/router'
import { decodeJwt } from 'jose'
import { getCookie, setCookie, deleteCookie } from 'cookies-next'

import { eres } from './eres'
import { delay } from './delay'

const cleanCookies = () => {
  deleteCookie('jwt')
  deleteCookie('data')
  deleteCookie('refreshToken')
}

const runRefreshToken = async ({ refreshToken, run }) => {
  if (!refreshToken) {
    cleanCookies()
    toast.error('Sua sessão expirou, redirecionando para o login')
    setTimeout(() => Router.replace('/'), 500)
    return
  }

  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()

  setCookie('jwt', data?.accessToken, {
    path: '/',
    sameSite: true,
  })
  setCookie('refreshToken', data?.refreshToken, {
    path: '/',
    sameSite: true,
  })
  setCookie('data', decodeJwt(data?.accessToken)?.payload, {
    path: '/',
    sameSite: true,
  })

  delay(2000)
  run()
}

export const fetcher = async ({
  path,
  body = null,
  method = 'GET',
  retries = 0,
}) => {
  if (retries === 3) {
    cleanCookies()
    toast.error('Sua sessão expirou, redirecionando para o login')
    setTimeout(() => Router.replace('/'), 500)
    return
  }

  const token = getCookie('jwt')
  const refreshToken = getCookie('refreshToken')

  if (token && decodeJwt(token)?.exp * 1000 < Date.now()) {
    await runRefreshToken({
      refreshToken,
      run: () =>
        fetcher({
          path,
          token,
          refreshToken,
          body,
          method,
          retries: retries + 1,
        }),
    })
    return
  }

  // If the path is not auth and there is no token, redirect to login
  if (!path.match(/auth/g) && !token) {
    cleanCookies()
    console.warn('No token for fetching')
    toast.error('Sua sessão não está correta, redirecionando para o login')
    setTimeout(() => Router.replace('/'), 500)
    return
  }

  const [error, response] = await eres(
    fetch(`/api${path}`, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
  )

  if (error) {
    console.log({ error })
    return
  }

  const result = await response.json()

  if (!response.ok) {
    const message =
      result?.message ||
      'Algo deu errado ao realizar a operação. Nossa equipe já foi acionada sobre o problema.'
    const error = new Error(message)
    error.info = result
    error.status = response.status

    throw error
  }

  return result
}
