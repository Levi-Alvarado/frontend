import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Container, Button, ButtonGroup } from 'react-bootstrap'
import PublishModal from './PublishModal'
import CategoryModal from './CategoryModal'
import PropTypes from 'prop-types'
import useStore from '../../context/Global'
import ProductCard from '../../components/Card'

function MyPublishes () {
  const [publishes, user, getProducts, token, categories] = useStore((state) => [state.publishes, state.user, state.getProducts, state.token, state.categories])
  const [selectedPublish, setSelectedPublish] = useState(null)
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [myPublishes, setMyPublishes] = useState(publishes.filter((publish) => publish.id_usuario === user.id))
  const handleAddPublish = () => {
    setSelectedPublish(null)
    setShowPublishModal(true)
  }

  const handleEditPublish = (publish) => {
    setSelectedPublish(publish)
    setShowPublishModal(true)
  }

  useEffect(() => {
    setMyPublishes(publishes.filter((publish) => publish.id_usuario === user.id))
  }, [publishes, user.id])

  return (
    <>
      <Container>
        <Card>
          <Card.Header>
            <section className="d-flex align-items-center justify-content-between">
              <h4>Published Items</h4>
              <ButtonGroup>
                <Button variant="light" onClick={handleAddPublish}>
                  Add Publication
                </Button>
              </ButtonGroup>
            </section>
          </Card.Header>
          <Card.Body>
            <Row xs={1} md={2} lg={3} className="g-4">
              {myPublishes.map((publish, idx) => (
                <Col md={6} lg={3} key={publish.id}>
                <ProductCard
                title={publish.titulo}
                price={publish.precio}
                image={publish.imagen}
                handleClick={() => {
                  handleEditPublish(publish)
                }}
                />
            </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      </Container>
      <PublishModal
        show={showPublishModal}
        handleClose={() => setShowPublishModal(false)}
        publication={selectedPublish}
        user={user}
        token={token}
        getProducts={getProducts}
        categories={categories}
      />

      <CategoryModal show={showCategoryModal} handleClose={() => setShowCategoryModal(false)} />
    </>
  )
}

MyPublishes.propTypes = {
  publishes: PropTypes.arrayOf(PropTypes.object)
}

export default MyPublishes
