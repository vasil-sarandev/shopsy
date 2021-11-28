import { FC } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import styles from '../styles/header.module.css'
import { CartIcon } from '../../../assets/icons/CartIcon'
import { Badge, STATIC_ROUTES } from '../../../shared'
import { getStore } from '../ducks'
import { getCart, getNumberOfProducts, useCart } from '../../cart'

interface Props {}

export const StoreHeader: FC<Props> = () => {
  const store = useSelector(getStore)
  const cart = useSelector(getCart)
  const { setCartVisible } = useCart()
  const numberOfProducts = getNumberOfProducts(cart)
  const homeLink = {
    as: STATIC_ROUTES.storePage.as.replace('[store]', store.slug),
    href: STATIC_ROUTES.storePage.href
  }
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <Link as={homeLink.as} href={homeLink.href}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>
                <img src={store.logo} alt='store logo' />
              </a>
            </Link>
          </div>
        </div>
        <div
          className={styles.right}
          style={{ marginRight: numberOfProducts > 9 ? '10px' : '0px' }}
        >
          {store.enableOrders && (
            <Badge count={numberOfProducts} props={{ size: 'small' }}>
              <div className={styles.cart} onClick={() => setCartVisible(true)}>
                <div className={styles.cartIcon}>
                  <CartIcon />
                </div>
              </div>
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}
