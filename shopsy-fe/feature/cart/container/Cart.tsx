import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { Drawer } from '../../../shared'
import { Cart } from '../component'
import { getCart, getCartVisible, useCart } from '../ducks'

interface Props {}

export const CartContainer: FC<Props> = () => {
  const [displayCart, setDisplayCart] = useState<boolean>(true)
  const cart = useSelector(getCart)
  const visible = useSelector(getCartVisible)
  const { addProduct, removeProduct, setCartVisible } = useCart()
  return (
    <Drawer
      visible={visible}
      onClose={() => {
        setCartVisible(false)
      }}
      closable
      width={500}
    >
      <Cart
        cart={cart}
        addProduct={addProduct}
        removeProduct={removeProduct}
        displayCart={displayCart}
        setDisplayCart={setDisplayCart}
      />
    </Drawer>
  )
}
