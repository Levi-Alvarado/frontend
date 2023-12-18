import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import useStore from '../context/Global'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function RegisterPage () {
  const [register] = useStore((state) => [state.register])
  const MySwal = withReactContent(Swal)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const name = data.get('name')
    const email = data.get('email')
    const password = data.get('password')
    const confirmPass = data.get('confirmPass')

    if (password !== confirmPass) {
      MySwal.fire({
        title: 'Las contraseñas no coinciden',
        icon: 'error'
      })
      return
    }

    // validate email
    const regex = /\S+@\S+\.\S+/
    if (!regex.test(email)) {
      MySwal.fire({
        title: 'Email invalido',
        icon: 'error'
      })
      return
    }
    try {
      const result = await register(email, password, name)
      console.log(result)
      MySwal.fire({
        title: 'Usuario creado correctamente',
        message: 'Bienvenido, ' + email + '! ' + ' Ya pueedes iniciar sesión',
        icon: 'success'
      })
      form.reset()
    } catch (error) {
      console.log(error)
      MySwal.fire({
        title: 'Algo salio mal',
        text: 'El correo ya existe',
        icon: 'error'
      })
    }

    console.log('Formulario enviado')
  }
  return (
    <>
      <Container className="Auth">
        <Row className="justify-content-md-center w-75">
          <Col md={6}>
            <h2> Sign Up</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicName" className="mb-3">
                <Form.Control type="text" placeholder="Name" name="name" />
              </Form.Group>

              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Control type="email" placeholder="Email" name="email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mb-3">
                <Form.Control type="password" placeholder="Password" name="password" />
              </Form.Group>

              <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
                {/* Nuevo grupo de formulario para confirmar contraseña */}
                <Form.Control type="password" placeholder="Confirm Password" name="confirmPass" />
              </Form.Group>

              <div className="d-grid">
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default RegisterPage
