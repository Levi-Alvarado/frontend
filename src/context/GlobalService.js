import { ENDPOINTS } from '../Constants'

export const getProduct = () => {
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
      this.set({ publishes: data.publishes })
    }).catch((error) => {
      console.error('There has been a problem with your fetch operation:', error.message)
    })
}
