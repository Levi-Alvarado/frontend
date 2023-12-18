import PropTypes from 'prop-types'
import { Minus } from '../icons/minus'
import { Plus } from '../icons/plus'
import useCartStore from '../context/Cart'

export const QuantityBox = ({ item, size }) => {
  const { removeItemFromCart, updateCartItemQuantity } = useCartStore((state) => state)

  const handleQuantityChange = (newQuantity) => {
    const validatedQuantity = Math.max(1, Math.floor(newQuantity))

    updateCartItemQuantity(item.id, validatedQuantity)
  }

  return (
    <div className="qty-box" style={size && { transform: 'scale(0.8)' }}>
      <div className="input-group">
        <button
          type="button"
          data-type="minus"
          className="btn btn-dark btn-square"
          onClick={() => removeItemFromCart(item)}
        >
          <Minus />
        </button>
        <input
          type="number"
          name="quantity"
          value={item.quantity}
          className="touchspin text-center form-control"
          onChange={(e) => handleQuantityChange(e.target.value)}
          min="1"
        />
        <button
          type="button"
          data-type="plus"
          className="btn btn-dark btn-square"
          onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
        >
          <Plus />
        </button>
      </div>
    </div>
  )
}

QuantityBox.propTypes = {
  item: PropTypes.object.isRequired,
  size: PropTypes.bool
}
