import React from 'react'
import { Card, Row, Col, ListGroup, Form } from 'react-bootstrap'
import useStore from '../../context/Global'

const ProfileSettings = () => {
  const [user] = useStore((state) => [state.user])
  return (
        <Card>
            <Card.Header>Personal Details</Card.Header>
            <Card.Body>
                <Row className="align-items-center">
                    <Col>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Form.Group controlId="formFullName">
                                    <Form.Label>
                                        <strong>Full Name:</strong>
                                    </Form.Label>
                                    <Form.Control type="text" value={user?.nombre} readOnly/>
                                </Form.Group>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>
                                        <strong>Email Address:</strong>
                                    </Form.Label>
                                    <Form.Control
                                    readOnly
                                        type="email"
                                        value={user?.correo_electronico}
                                    />
                                </Form.Group>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer className="w-100 text-right">
            </Card.Footer>
        </Card>
  )
}

export default ProfileSettings
