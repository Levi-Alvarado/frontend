import { http, HttpResponse } from 'msw'
import { ENDPOINTS } from '../Constants'
import data from '../assets/publishes.json'

const dataPublishes = { publicaciones: data.publicaciones }
export const handlersPublishes = [
  http[ENDPOINTS.getPublishes.method](
    ENDPOINTS.getPublishes.path,
    () => {
      return HttpResponse.json({
        publishes: dataPublishes.publicaciones
      })
    }),
  http[ENDPOINTS.addPublication.method](
    ENDPOINTS.addPublication.path,
    async ({ request }) => {
      const {
        id_usuario,
        fecha_publicacion,
        titulo,
        descripcion,
        id_categoria,
        precio,
        imagen
      } = await request.json()
      const id = dataPublishes.publicaciones.length + 1
      const newPublication = {
        id,
        id_usuario,
        fecha_publicacion,
        titulo,
        descripcion,
        id_categoria,
        precio,
        imagen,
        comentarios: []
      }
      dataPublishes.publicaciones.push(newPublication)
      console.log({ newPublication, nuevoArray: dataPublishes.publicaciones })
      return HttpResponse.json({
        message: 'Publication added successfully'
      })
    }),
  http[ENDPOINTS.updatePublication.method](
    ENDPOINTS.updatePublication.path,
    async ({ request }) => {
      const {
        id,
        id_usuario,
        fecha_publicacion,
        titulo,
        descripcion,
        id_categoria,
        precio,
        imagen,
        comentarios
      } = await request.json()
      console.log({ id, id_usuario, fecha_publicacion, titulo, descripcion, id_categoria, precio, imagen, comentarios })
      const index = dataPublishes.publicaciones.findIndex(p => p.id.toString() === id.toString())
      dataPublishes.publicaciones[index] = {
        id,
        id_usuario,
        fecha_publicacion,
        titulo,
        descripcion,
        id_categoria,
        precio,
        imagen,
        comentarios
      }
      console.log(dataPublishes.publicaciones)
      return HttpResponse.json({
        message: 'Publication updated successfully'
      })
    })
]
