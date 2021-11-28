import { FC } from 'react'
import { Category, Product, ProductsList } from '../../../shared'
import { CategoriesList } from '../components/CategoriesList'
import styles from '../styles/container.module.css'

interface Props {
  categories: Array<Category>
  products: Array<Product>
}

export const StorePageContainer: FC<Props> = ({ categories, products }) => {
  if (categories.length === 0) return <h2>Магазинът все още не е въвел каталога си.</h2>
  return (
    <div className={styles.container}>
      {/* offset for layout container. */}
      <div className={styles.title}>Категории</div>
      <div className={styles.categories}>
        <CategoriesList categories={categories} />
      </div>
      <div className={styles.title}>Препоръчани продукти</div>
      <div className={styles.featured}>
        <ProductsList products={products} />
      </div>
    </div>
  )
}
