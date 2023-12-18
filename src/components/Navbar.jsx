import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import useStore from '../context/Global'
import { NavbarCart } from './NavbarCart'

const Links = [
  {
    path: '/',
    name: 'Home'
  },
  {
    path: '/config',
    name: 'Store Config',
    private: true
  }
]
function PageNavbar () {
  const { isAuthenticated, logout } = useStore((state) => state)
  return (
    <React.Fragment>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Marketplace</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {Links.map((link) =>
              isAuthenticated || !link.private
                ? (
                <Nav key={link.path}>
                  <Link className="nav-link" to={link.path}>
                    {link.name}
                  </Link>
                </Nav>
                  )
                : null
            )}

            {isAuthenticated
              ? (
              <Nav className="ms-auto">
                <NavbarCart/>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </Nav>
                )
              : (
              <Nav className="ms-auto">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </Nav>
                )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  )
}

export default PageNavbar
