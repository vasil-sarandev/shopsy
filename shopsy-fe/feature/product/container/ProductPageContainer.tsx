import Image from 'next/image'
import { FC } from 'react'
import { Button, Product, toReadablePrice, Slider } from '../../../shared'
import { useCart } from '../../cart'
import { ProductSuggestions } from '../component'
import styles from '../styles/container.module.css'
import { displayTextWithNewLines } from '../util'

interface Props {
  product: Product
  suggestions: Product[]
}

export const ProductPageContainer: FC<Props> = ({ product, suggestions }) => {
  const { addProduct } = useCart()
  const handleAddProduct = () => addProduct(product)

  const slides = product.images.map((x) => (
    <Image src={x} key={x} width={300} height={300} layout='responsive' alt={product.name} />
  ))

  return (
    <div className={styles.container}>
      <div className={styles.sliderContainer}>
        <Slider slides={slides} loop key={product._id} />
      </div>
      <div className={styles.productContainer}>
        <div className={styles.name}>{product.name}</div>
        <div className={styles.price}>{toReadablePrice(product.price)}</div>
        <div className={styles.btn}>
          <Button onClick={handleAddProduct} block>
            Добави в количката
          </Button>
        </div>
        <div className={styles.description}>{displayTextWithNewLines(product.description)}</div>
      </div>
      <ProductSuggestions suggestions={suggestions} />
    </div>
  )
}
