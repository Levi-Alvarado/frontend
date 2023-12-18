import { Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Cart from '../icons/cart'
import MoneyCLPFormat from '../utils/utils'
import useCartStore from '../context/Cart'

export const NavbarCart = () => {
  const { cart } = useCartStore((state) => state)
  console.log('🦄 -> cart', cart)
  const totalQty = cart.items.reduce((acc, item) => acc + item.quantity, 0) || 0
  return (
    <div className="d-flex gap-3 align-items-center justify-content-center">
      <Link id="navbarCart" to="/carrito" relative="path">
        <Badge className="cart-items" bg="dark">
          {totalQty}
        </Badge>
        <Cart width="30" height="30" style={{ fill: '#000' }} />
      </Link>
      <p className="pt-1 h5">{MoneyCLPFormat(cart.total)}</p>
    </div>
  )
}
