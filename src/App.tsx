import './App.css'

import React, { useState } from 'react'
import { StyledButton, Wrapper } from './App.styles'

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Badge from '@mui/material/Badge'
import Cart from './cart/Cart'
import Drawer from '@mui/material/Drawer'
import Grid from '@mui/material/Grid'
import Item from './Items/Item'
import LinearProgress from '@mui/material/LinearProgress'
import { useQuery } from 'react-query'

//styels
//types
export type CartItemType = {
  id: number
  category: string
  description: string
  image: string
  price: number
  title: string
  amount: number
}

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json()

const App = () => {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemType[])
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  )

  //console.log(data)

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((accumulator: number, item) => accumulator + item.amount, 0)

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prevState) => {
      //is the item already exist
      const isItemInCart = prevState.find((item) => item.id === clickedItem.id)
      if (isItemInCart) {
        return prevState.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        )
      }
      return [...prevState, { ...clickedItem, amount: 1 }]
    })
  }

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc
          return [...acc, { ...item, amount: item.amount - 1 }]
        } else {
          return [...acc, item]
        }
      }, [] as CartItemType[])
    )
  }

  if (isLoading) {
    return <LinearProgress />
  }
  if (error) {
    return <div>Something went wrong...</div>
  }

  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  )
}

export default App
