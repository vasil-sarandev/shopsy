import { DollarCircleFilled, EditOutlined } from '@ant-design/icons'
import { FC } from 'react'
import {
  CustomLink,
  Order,
  STATIC_ROUTES,
  toReadableDate,
  toReadablePrice
} from '../../../../shared'
import styles from '../styles/orderCard.module.css'

interface Props {
  order: Order
}

export const OrderCard: FC<Props> = ({ order }) => {
  const orderLink = STATIC_ROUTES.order.as.replace('[id]', order._id)
  const containerClass = `${styles.container} ${!order.complete ? styles.notComplete : ''}`

  return (
    <div className={containerClass}>
      <div className={styles.orderIdentifier}>
        <div className={styles.info}>
          <CustomLink as={orderLink} href={STATIC_ROUTES.order.href}>
            {order.details.name}
          </CustomLink>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.price}>
          <div className={styles.cardIcon}>
            <DollarCircleFilled />
          </div>
          <div className={styles.actualPrice}>{toReadablePrice(order.totalPrice)}</div>
        </div>
        <div className={styles.cardIcon}>
          <CustomLink as={orderLink} href={STATIC_ROUTES.order.href}>
            <EditOutlined />
          </CustomLink>
        </div>
      </div>
      <div className={styles.orderDate}>{toReadableDate(order.createdAt)}</div>
    </div>
  )
}
