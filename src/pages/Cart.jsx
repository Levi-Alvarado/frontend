import { Button, Card, Image, Table } from 'react-bootstrap'
import { QuantityBox } from '../components/QuantityBox'
import { toMoneyFormat, toPascalCase } from '../utils/utils'
import useCartStore from '../context/Cart'

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCartStore((state) => state)
  console.log(cart)
  const buy = () => {
    window.alert('Successful buy!')
    clearCart()
  }

  return (
    <Card body className='my-3 mx-2 bg-yellow'>
      <Card.Body className='row align-items-center'>
        <h2>Cart</h2>
        <div className='line' />
        <Table variant='warning' responsive striped>
          <thead>
            <tr>
              <th>Product</th>
              <th>Sub total</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.items.length === 0 && (
              <tr>
                <td colSpan={4} aria-colspan={3} className='w-100 text-center'>
                  <p className='my-0'>No products in the cart</p>
                </td>
              </tr>
            )}
            {cart.items.map((item) => (
              <tr key={item.id}>
                <td className='d-flex align-items-center gap-3'>
                  <Image src={item.imagen} width={50} height={50} rounded />
                  <p className='my-0'>{toPascalCase(item.titulo)}<span className='text-muted small'> x {toMoneyFormat(item.precio)}</span></p>
                </td>
                <td>
                  <p className='d-flex align-items-center my-0'>{toMoneyFormat(item.subtotal)}</p>
                </td>
                <td width={200}>
                  <QuantityBox item={item} />
                </td>
                <td>
                  <Button variant='danger' onClick={() => removeFromCart(item)}>🗑️</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className='line' />
        <p>Total to pay: {toMoneyFormat(cart.total)}</p>

        <Button className={cart.total > 0 ? 'Button w-25 mx-2' : 'Button w-25 disabled mx-2'} variant='dark' size='lg' onClick={clearCart}>Empty Cart</Button>
        <Button className={cart.total > 0 ? 'Button w-25 mx-2' : 'Button w-25 disabled mx-2'} variant='success' size='lg' onClick={buy}>Buy</Button>

      </Card.Body>
    </Card>
  )
}

export default Cart
