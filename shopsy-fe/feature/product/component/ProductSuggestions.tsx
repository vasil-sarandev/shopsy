import { isEmpty } from 'lodash'
import { FC } from 'react'
import { Product, ProductsList } from '../../../shared'
import styles from '../styles/suggestions.module.css'

interface Props {
  suggestions: Product[]
}

export const ProductSuggestions: FC<Props> = ({ suggestions }) => {
  const hasSuggestions = !isEmpty(suggestions)
  if (!hasSuggestions) return null

  return (
    <div className={styles.container}>
      <div className={styles.suggestionsTitle}>Също може да ви хареса</div>
      <ProductsList products={suggestions} />
    </div>
  )
}
