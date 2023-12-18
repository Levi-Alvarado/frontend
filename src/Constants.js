const path = {
  prod: 'https://marketplace-backend-q7n8.onrender.com',
  dev: ''
}
const enviroment = path.prod
export const ENDPOINTS = {
  register: { path: enviroment + '/usuarios/registro', method: 'post' },
  login: { path: enviroment + '/usuarios/login', method: 'post' },
  getCategories: { path: enviroment + '/categorias', method: 'get' },
  getPublishes: { path: enviroment + '/publicaciones', method: 'get' },
  addPublication: { path: enviroment + '/publicaciones', method: 'post' },
  getPublication: { path: enviroment + '/publicaciones/:id', method: 'get' },
  updatePublication: { path: enviroment + '/publicaciones/:id', method: 'put' },
  deletePublication: { path: enviroment + '/publicaciones/:id', method: 'delete' },
  addComment: { path: enviroment + '/publicaciones/:id/comentarios', method: 'post' }
}
