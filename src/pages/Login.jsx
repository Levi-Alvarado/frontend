import React, { useEffect, useRef } from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap'
import useStore from '../context/Global'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function LoginPage () {
  const form = useRef(null)
  const login = useStore((state) => state.login)
  console.log(login)
  const MySwal = withReactContent(Swal)

  useEffect(() => {
    form.current.email.value = 'test@test.cl'
    form.current.password.value = 'asd123'
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const email = data.get('email')
    const password = data.get('password')
    try {
      await login(email, password)
      MySwal.fire({
        title: 'Iniciaste sesión correctamente',
        icon: 'success',
        text: 'Bienvenido, ' + email
      })
    } catch (error) {
      console.log(error)
      MySwal.fire({
        title: 'Algo salio mal',
        text: error.message,
        icon: 'error'
      })
    }
  }

  return (
    <>
      <Container className="Auth">
        <Row className="justify-content-md-center w-75">
          <Col md={6}>
            <h2>Login</h2>
            <Form onSubmit={handleSubmit} ref={form}>
              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Control type="email" placeholder="Email" name="email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mb-3">
                <Form.Control type="password" placeholder="Password" name="password" />
              </Form.Group>

              <div className="d-grid">
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default LoginPage
