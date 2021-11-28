import { LeftCircleOutlined } from '@ant-design/icons'
import { FC } from 'react'
import { Button } from '../../../shared'
import styles from '../styles/cartDeliveryDetails.module.css'
import { CartDeliveryForm } from './CartDeliveryForm'

interface Props {
  displayForm: boolean
  setDisplayForm: (boolean) => void
}

export const CartActions: FC<Props> = ({ displayForm, setDisplayForm }) => (
  <div className={styles.wrapper}>
    {displayForm ? (
      <div className={styles.inner}>
        <div
          className={styles.goBack}
          onClick={() => {
            setDisplayForm(false)
          }}
        >
          <LeftCircleOutlined /> Oбратно към количката
        </div>
        <CartDeliveryForm />
      </div>
    ) : (
      <Button
        onClick={() => {
          setDisplayForm(true)
        }}
        block
      >
        Към детайли за поръчката
      </Button>
    )}
  </div>
)
