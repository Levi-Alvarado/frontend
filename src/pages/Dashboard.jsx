import React, { useEffect, useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import ProductCard from './../components/Card'
import useStore from '../context/Global'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [publishes, setPublishes] = useState([])
  const [publishesStore] = useStore((state) => [state.publishes])
  const navigate = useNavigate()
  useEffect(() => {
    console.log({ publishesStore })
    publishesStore?.length > 0 && setPublishes(publishesStore)
  }, [publishesStore])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredPublishes = publishes.filter((publish) => {
    return publish.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
         publish.precio.toString().includes(searchTerm)
  })

  return (
    <>
      <section className='container-xl'>
        <Row className="mb-4 mt-4">
          <Col>
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Col>
        </Row>

        <Row className="mb-4 w-100 gap-2">
          {
            filteredPublishes.map((publish) => (
              <Col md={6} lg={3} key={publish.id}>
              <ProductCard
               title={publish.titulo}
               price={publish.precio}
               image={publish.imagen}
               handleClick={() => {
                 navigate(`/publication/${publish.id}`)
               }}
              />
            </Col>
            ))
          }
        </Row>
      </section>
    </>
  )
}

export default Dashboard
