import Button from '@mui/material/Button'
import CartItem from '../CartItem/CartItem'
import { CartItemType } from '../App'
import { Wrapper } from './Cart.styles'

type CartProps = {
  cartItems: CartItemType[]
  addToCart: (clickedItem: CartItemType) => void
  removeFromCart: (id: number) => void
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  addToCart,
  removeFromCart,
}) => {
  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}

      {cartItems.map((item) => (
        <CartItem />
      ))}
    </Wrapper>
  )
}
export default Cart