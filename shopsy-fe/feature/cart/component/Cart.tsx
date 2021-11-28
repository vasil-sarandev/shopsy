import { FC } from 'react'
import { CartProduct, Product, toReadablePrice } from '../../../shared'
import styles from '../styles/cart.module.css'
import { calculateTotalPrice } from '../util'
import { CartActions } from './CartActions'
import { CartProductComponent } from './CartProduct'

interface Props {
  cart: Array<CartProduct>
  addProduct: (product: Product) => void
  removeProduct: (product: Product) => void
  displayCart: boolean
  setDisplayCart: (boolean) => void
}

export const Cart: FC<Props> = ({
  cart,
  addProduct,
  removeProduct,
  displayCart,
  setDisplayCart
}) => {
  if (!cart.length) return <div className={styles.warning}>Количката ви е празна.</div>
  const productList = cart.map((cartProduct) => (
    <CartProductComponent
      key={cartProduct.product._id}
      product={cartProduct}
      addProduct={addProduct}
      removeProduct={removeProduct}
    />
  ))
  return (
    <div className={styles.wrapper}>
      {displayCart && (
        <>
          <div className={styles.heading}>Количка</div>
          <div className={styles.products}>{productList}</div>
          <div className={styles.cartTotal}>
            Обща сума: {toReadablePrice(calculateTotalPrice(cart))}
          </div>
        </>
      )}
      <CartActions displayForm={!displayCart} setDisplayForm={(bool) => setDisplayCart(!bool)} />
    </div>
  )
}
