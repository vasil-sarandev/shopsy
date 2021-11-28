import Image from 'next/image'
import { FC } from 'react'
import { toReadablePrice } from '../../../../shared'
import { OrderProduct } from '../../../../shared/model/OrderProduct'
import styles from '../styles/productCard.module.css'

interface Props {
  product: OrderProduct
}

export const ProductCard: FC<Props> = ({ product }) => (
  <div className={styles.container}>
    <div className={styles.info}>
      <div className={styles.image}>
        <Image src={product.product.image} height={30} width={30} />
      </div>
      <div className={styles.name}>
        {product.product.name}, {product.quantity}бр.
      </div>
    </div>
    <div className={styles.total}>Общо: {toReadablePrice(product.price)}</div>
  </div>
)
