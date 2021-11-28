import { FC } from 'react'
import { Button, CustomLink, STATIC_ROUTES, Store } from '../../../shared'
import styles from '../styles/storeCard.module.css'

interface Props {
  store: Store
}

export const StoreCard: FC<Props> = ({ store }) => {
  const orderLink = STATIC_ROUTES.storePage.as.replace('[store]', store.slug)

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.name}>
          {store.name}/{store.slug}
        </div>
      </div>
      <div className={styles.right}>
        <CustomLink as={orderLink} href={STATIC_ROUTES.storePage.href}>
          <Button onClick={() => {}}>Разгледай</Button>
        </CustomLink>
      </div>
    </div>
  )
}
