import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { ENDPOINTS } from '../../Constants'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
function PublishModal ({ show, handleClose, publication, user, token, getProducts, categories }) {
  const MySwal = withReactContent(Swal)
  const [formData, setFormData] = useState({
    publication_date: '2023-11-25T10:00:00Z',
    title: 'Moto G54',
    description: 'Celular Moto G54 5g 8+256',
    category: '',
    price: 2990,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_959787-MLC72145371134_102023-F.webp'
  })

  useEffect(() => {
    if (publication) {
      setFormData({
        publication_date: publication.fecha_publicacion,
        title: publication.titulo,
        description: publication.descripcion,
        category: publication.id_categoria,
        price: publication.precio,
        image: publication.imagen
      })
    }
  }, [publication])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    /* to base64 */
    const reader = new window.FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setFormData((prevState) => ({
        ...prevState,
        image: reader.result
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    const url = publication ? ENDPOINTS.addPublication.path + `/${publication.id}` : ENDPOINTS.addPublication.path
    const method = publication ? 'PUT' : 'POST'
    const dataToSend = {
      id: publication ? publication.id : null,
      fecha_publicacion: formData.publication_date,
      titulo: formData.title,
      descripcion: formData.description,
      imagen: formData.image,
      precio: Number(formData.price),
      id_categoria: formData.category,
      id_usuario: user.id,
      comentarios: publication ? publication.comentarios : []
    }
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      })
      await getProducts()
      if (response.ok) {
        MySwal.fire({
          title: 'Publicación creada correctamente',
          icon: 'success',
          text: 'Bienvenido, ' + user.correo_electronico
        })
      } else {
        throw new Error(response.statusText)
      }
    } catch (error) {
      MySwal.fire({
        title: 'Algo salio mal',
        text: error.message,
        icon: 'error'
      })
    }

    handleClose()
  }

  const deletePublish = async () => {
    try {
      const response = await fetch(ENDPOINTS.addPublication.path + `/${publication.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      await getProducts()
      if (response.ok) {
        MySwal.fire({
          title: 'Publicación eliminada correctamente',
          icon: 'success',
          text: 'Bienvenido, ' + user.correo_electronico
        })
      } else {
        throw new Error(response.statusText)
      }
    } catch (error) {
      MySwal.fire({
        title: 'Algo salio mal',
        text: error.message,
        icon: 'error'
      })
    }
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{publication ? 'Edit Post' : 'Create New Post'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Publication Date</Form.Label>
            <Form.Control
              type="text"
              name="publication_date"
              value={formData.publication_date}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="" disabled>Select a category</option>
              {
                categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.nombre}</option>
                ))
              }
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" name="image" onChange={handleFileChange} />
          </Form.Group>

          <Button variant="primary" type="submit">
             {publication ? 'Update' : 'Create'}
          </Button>

          {
            publication && (
              <Button variant="danger" className="ms-2" onClick={deletePublish}>
                Delete
              </Button>
            )
          }
        </Form>
      </Modal.Body>
    </Modal>
  )
}

PublishModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  publication: PropTypes.object,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  getProducts: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object)
}

export default PublishModal
