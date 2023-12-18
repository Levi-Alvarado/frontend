import { create } from 'zustand'
import { ENDPOINTS } from '../Constants'

const useStore = create((set) => ({
  publishes: [],
  user: null,
  token: null,
  isAuthenticated: false,
  getCategories: () => {
    console.log('getCategories')
    fetch(ENDPOINTS.getCategories.path, {
      method: ENDPOINTS.getCategories.method
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      })
      .then((data) => {
        set({ categories: data })
      })
  },
  getProducts: () => {
    console.log('getProducts')
    fetch(ENDPOINTS.getPublishes.path, {
      method: ENDPOINTS.getPublishes.method
    })
      .then((response) => {
        if (response.ok) {
          console.log(response)
          return response.json()
        }
      })
      .then((data) => {
        console.log(data)
        set({ publishes: data })
      })
  },
  login: async (email, password) => {
    const response = await fetch(ENDPOINTS.login.path, {
      method: ENDPOINTS.login.method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    console.log('🦄 -> response', response)
    if (response.ok) {
      const data = await response.json()
      console.log('🦄 -> data', data)
      set({ user: data.user, isAuthenticated: true, token: data.token })
    } else {
      console.log('🦄 -> response', response)
      throw new Error(response.statusText)
    }
  },
  register: async (email, password, name) => {
    const response = await fetch(ENDPOINTS.register.path, {
      method: ENDPOINTS.register.method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, name })
    })
    console.log('🦄 -> response', response)
    if (response.ok) {
      return response.json()
    } else {
      console.log('🦄 -> response', response)
      throw new Error(response.statusText)
    }
  },
  setPublishes: (publishes) => set({ publishes }),
  setUser: (user) => set({ user, isAuthenticated: true, token: user.token }),
  logout: () => set({ user: null, isAuthenticated: false, token: null })
}))

export default useStore
