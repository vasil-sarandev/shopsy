import { FC } from 'react'
import { MinusCircleFilled, PlusCircleFilled } from '@ant-design/icons'
import styles from '../styles/cart.module.css'
import { CartProduct, Product, toReadablePrice } from '../../../shared'

interface Props {
  product: CartProduct
  addProduct: (product: Product) => void
  removeProduct: (product: Product) => void
}

export const CartProductComponent: FC<Props> = ({ product, addProduct, removeProduct }) => {
  const handleAdd = () => {
    addProduct(product.product)
  }
  const handleRemove = () => {
    removeProduct(product.product)
  }
  return (
    <div className={styles.productWrapper}>
      <div className={styles.productInner}>
        <div className={styles.productLeft}>
          <div className={styles.productName}>{product.product.name}</div>
          <div className={styles.quantity}>
            <MinusCircleFilled onClick={handleRemove} />
            <div className={styles.productQuantity}>{product.quantity}</div>
            <PlusCircleFilled onClick={handleAdd} />
          </div>
          <div className={styles.productBottom}>
            <div className={styles.total}>
              Общо: {toReadablePrice(product.quantity * product.price)}
            </div>
          </div>
        </div>
        <div className={styles.productRight}>
          <div className={styles.productPrice}>{toReadablePrice(product.product.price)}</div>
          <div className={styles.productImage}>
            <img src={product.product.images[0]} alt='product' />
          </div>
        </div>
      </div>
    </div>
  )
}
