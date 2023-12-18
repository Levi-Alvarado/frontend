import create from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: { items: [], total: 0 },

      addToCart: (publication) => {
        const cart = { ...get().cart }
        if (cart.items.find((item) => item.id === publication.id)) {
          cart.items = cart.items.map((item) => {
            if (item.id === publication.id) {
              return {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.subtotal + item.precio
              }
            }
            return item
          })
        } else {
          cart.items.push({ ...publication, quantity: 1, subtotal: publication.precio })
        }
        cart.total = cart.items.reduce((acc, item) => acc + item.subtotal, 0)
        set({ cart })
      },

      removeFromCart: (publication) => {
        const cart = { ...get().cart }
        cart.items = cart.items.filter((item) => item.id !== publication.id)
        cart.total = cart.items.reduce((acc, item) => acc + item.subtotal, 0)
        set({ cart })
      },

      clearCart: () => {
        set({ cart: { items: [], total: 0 } })
      },

      removeItemFromCart: (publication) => {
        const cart = { ...get().cart }
        const selectedItem = cart.items.find((item) => item.id === publication.id)
        if (selectedItem && selectedItem.quantity > 1) {
          cart.items = cart.items.map((item) => {
            if (item.id === publication.id) {
              return {
                ...item,
                quantity: item.quantity - 1,
                subtotal: item.subtotal - item.precio
              }
            }
            return item
          })
        } else {
          cart.items = cart.items.filter((item) => item.id !== publication.id)
        }
        cart.total = cart.items.reduce((acc, item) => acc + item.subtotal, 0)
        set({ cart })
      },

      updateCartItemQuantity: (publicationId, updateQuantity) => {
        const cart = { ...get().cart }
        cart.items = cart.items.map((item) => {
          if (item.id === publicationId) {
            return {
              ...item,
              quantity: updateQuantity,
              subtotal: item.precio * updateQuantity
            }
          }
          return item
        })
        cart.total = cart.items.reduce((acc, item) => acc + item.subtotal, 0)
        set({ cart })
      }
    }),
    {
      name: 'cart-storage',
      getStorage: () => window.localStorage
    }
  )
)

export default useCartStore
