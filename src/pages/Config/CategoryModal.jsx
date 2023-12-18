import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import PropTypes from 'prop-types'

function CategoryModal ({ show, handleClose }) {
  const [categoryData, setCategoryData] = useState({
    Name: '',
    Description: '',
    Image: null
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setCategoryData({
      ...categoryData,
      [name]: value
    })
  }

  const handleImageChange = (e) => {
    setCategoryData({
      ...categoryData,
      imagen: e.target.files[0]
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(categoryData)
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="Name"
              required
              value={categoryData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              value={categoryData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={handleImageChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save Category
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

CategoryModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default CategoryModal
