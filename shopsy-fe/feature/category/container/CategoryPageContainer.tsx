import { FC } from 'react'
import { Category, ProductsList } from '../../../shared'
import styles from '../styles/container.module.css'

interface Props {
  category: Category
}

export const CategoryPageContainer: FC<Props> = ({ category }) => (
  <div className={styles.container}>
    <div className={styles.categoryTitle}>{category.title}</div>
    <div>
      <ProductsList products={category.products} />
    </div>
  </div>
)
