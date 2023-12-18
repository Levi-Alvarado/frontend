import React from 'react'
import Card from 'react-bootstrap/Card'
import PropTypes from 'prop-types'
import MoneyCLPFormat from '../utils/utils'
const ProductCard = ({
  title,
  price,
  image,
  handleClick
}) => {
  console.log({ title, price, image, handleClick })
  return (
    <Card className="hovereable" onClick={handleClick}>
      <Card.Img
        style={{ minHeigth: '150px', objectFit: 'contain', maxHeight: '150px' }}
        variant="top"
        src={image}
        className="mx-auto d-block"
      />
      <Card.Body>
        <Card.Title>{MoneyCLPFormat(price)}</Card.Title>
        <div className="d-flex justify-content-between">
          <Card.Text className="text-muted">{title}</Card.Text>
        </div>
      </Card.Body>
    </Card>
  )
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default ProductCard
