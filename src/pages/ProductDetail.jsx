import { Button, Card, Image, ListGroup, Form, InputGroup } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { toMoneyFormat, toPascalCase } from '../utils/utils'
import useStore from '../context/Global'
import '../styles/ProductDetail.css'
import useCartStore from '../context/Cart'

const ProductDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { addToCart } = useCartStore((state) => state)
  const { removeItemFromCart } = useCartStore((state) => state)
  const publishes = useStore((state) => state.publishes)

  const publication = publishes.find((publish) => publish.id === Number(id))

  if (!publication) {
    return navigate('/404')
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const comment = data.get('comment')
    console.log(comment)
  }

  return (
    <Card body className="product-detail-card my-3 mx-2">
      <Card.Body className="row">
        <section className="col-lg-6 col-md-12">
          <Image fluid src={publication.imagen} alt={publication.descripcion} className="product-image" />
        </section>
        <section className="col-lg-6 col-md-12 product-info-section">
          <h1 className="product-title">{toPascalCase(publication.titulo)}</h1>
          <p className="product-price" style={{ fontFamily: 'serif' }}>
            {toMoneyFormat(publication.precio.toFixed(2))}
          </p>
          <div className="d-flex gap-3">
            <Button
              className="add-to-cart-btn"
              variant="dark"
              size="lg"
              onClick={() => addToCart(publication)}
            >
              Add to the cart
            </Button>
            <Button
              className="remove-from-cart-btn"
              variant="dark"
              size="lg"
              onClick={() => removeItemFromCart(publication)}
            >
              Remove
            </Button>
          </div>

          <div className="comments-section">
            <h3>Comments</h3>
            <ListGroup className="comments-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {
                publication.comentarios && publication.comentarios.length > 0
                  ? publication.comentarios.map((comment, index) => (
                    <ListGroup.Item key={index}>{comment.contenido}</ListGroup.Item>
                  ))
                  : <p>No hay comentarios</p>
              }
            </ListGroup>
            <Form onSubmit={handleCommentSubmit} className="comment-form mt-3">
              <InputGroup>
                <Form.Control placeholder="Add a comment..." name="comment" />
                <Button variant="outline-secondary" type="submit">
                  Send
                </Button>
              </InputGroup>
            </Form>
          </div>
        </section>
      </Card.Body>
    </Card>
  )
}

export default ProductDetail
