import React, { useState } from 'react'
import {
  Container,
  Row,
  Col,
  ListGroup,
  Navbar,
  Nav
} from 'react-bootstrap'
import ProfileSettings from './ProfileSettings'
import MyPublishes from './MyPublishes'
import useStore from '../../context/Global'
import '../../styles/Config.css'

function ConfigPage () {
  const [selectedItem, setSelectedItem] = useState('Profile Settings')
  const [logout] = useStore((state) => [state.logout])
  return (
    <>
      <Container fluid className="mt-4">
        <Row>
          <Col md={3} sm={12} className="sidebar">
            <ListGroup>
              <ListGroup.Item className='hoverable-element'
                onClick={() => setSelectedItem('Profile Settings')}
              >
                Profile Settings
              </ListGroup.Item>
              <ListGroup.Item className='hoverable-element'
                onClick={() => setSelectedItem('Published Articles')}
              >
                Published Articles
              </ListGroup.Item>
              <ListGroup.Item action onClick={logout}>Log Out</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={9} sm={12}>
            {selectedItem === 'Profile Settings' && <ProfileSettings />}
            {selectedItem === 'Published Articles' && <MyPublishes/>}
          </Col>
        </Row>
      </Container>

      <Navbar fixed="bottom" bg="light">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="#faq">Frequently Asked</Nav.Link>
            <Nav.Link href="#support">Customer Support</Nav.Link>
            <Nav.Link href="#guide">User Guide</Nav.Link>
            <Nav.Link href="#contact">Contact Us</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default ConfigPage
