import Button from '@mui/material/Button'
import { CartItemType } from '../App'
import React from 'react'
import { Wrapper } from './Item.styles'

type ItemProps = {
  item: CartItemType
  handleAddToCart: (clickedItem: CartItemType) => void
}

const Item: React.FC<ItemProps> = ({ item, handleAddToCart }) => (
  <Wrapper>
    <img src={item.image} alt={item.title} />
    <div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <h3>${item.price}</h3>
    </div>
    <Button onClick={() => handleAddToCart(item)}>Add to Cart</Button>
  </Wrapper>
)
export default Item
