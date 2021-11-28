import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Checkbox, DeliveryTypes, Input } from '../../../../shared'
import { getCreateStoreFormState, useCreateStore } from '../ducks'
import styles from '../styles/main.module.css'
import { shouldDisableNextDeliveryTypes } from '../util/shouldDisableNextDeliveryTypes'

interface Props {
  setNextDisabled: (boolean) => void
}

const DELIVERY_TYPES = [
  { label: 'До офис на speedy', key: 'speedy' },
  { label: 'До офис на econt', key: 'econt' },
  { label: 'До личен адрес', key: 'address' },
  { label: 'Взимане от място', key: 'pickup' }
]

export const StoreDeliveries: FC<Props> = ({ setNextDisabled }) => {
  const formState = useSelector(getCreateStoreFormState)
  const { setFormField } = useCreateStore()

  useEffect(() => {
    setNextDisabled(shouldDisableNextDeliveryTypes(formState))
  }, [formState])

  const handleChangeDeliveryType = (deliveryType: string) => (which: string, val: any) => {
    const newDeliveryTypes: DeliveryTypes = {
      ...formState.deliveryTypes,
      [deliveryType]: { ...formState.deliveryTypes[deliveryType], [which]: val }
    }
    setFormField('deliveryTypes', newDeliveryTypes)
  }

  const deliveryTypes = DELIVERY_TYPES.map((x) => (
    <div className={styles.deliveryType} key={x.key}>
      <Checkbox
        name='active'
        value={formState.deliveryTypes[x.key].active}
        onChange={handleChangeDeliveryType(x.key)}
      >
        {x.label}
      </Checkbox>
      <div className={styles.deliveryTypePrice}>
        <div className={styles.label}>Цена</div>
        <Input
          name='price'
          type='number'
          value={formState.deliveryTypes[x.key].price}
          onChange={handleChangeDeliveryType(x.key)}
          disabled={formState.deliveryTypes[x.key].active === false}
        />
      </div>
    </div>
  ))

  return (
    <div className={styles.deliveryWrapper}>
      <Checkbox name='enableOrders' value={formState.enableOrders} onChange={setFormField}>
        Позволи поръчки
      </Checkbox>
      <div className={styles.inputHelp}>
        Ако ще ползвате платформата само за дигитален каталог - без да приемате поръчки, оставете
        този бутон неактивен. Може да се промени по всяко време.
      </div>
      {formState.enableOrders && (
        <div className={styles.deliveryTypesWrapper}>
          <div className={styles.deliveriesHeading}>Типове доставка</div>
          {deliveryTypes}
        </div>
      )}
    </div>
  )
}
