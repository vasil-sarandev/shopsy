import { FC } from 'react'
import { useSelector } from 'react-redux'
import styles from '../styles/cartDeliveryDetails.module.css'
import { Button, Input, TextArea, Select, toReadablePrice } from '../../../shared'
import { getCartFormState, getCreateOrderLoading, useCart } from '../ducks'
import { getStore } from '../../store'

interface Props {}

export const CartDeliveryForm: FC<Props> = () => {
  const formValues = useSelector(getCartFormState)
  const loading = useSelector(getCreateOrderLoading)
  const store = useSelector(getStore)

  // make sure to change mappedDeliveryTypes whenever you change this.
  const DELIVERY_OPTIONS = [
    {
      label: `Доставка до офис на Speedy (${toReadablePrice(store.deliveryTypes.speedy.price)})`,
      value: 'Доставка до офис на Speedy',
      active: store.deliveryTypes.speedy.active
    },
    {
      label: `Доставка до офис на Econt (${toReadablePrice(store.deliveryTypes.econt.price)})`,
      value: 'Доставка до офис на Econt',
      active: store.deliveryTypes.econt.active
    },
    {
      label: `Доставка до личен адрес (${toReadablePrice(store.deliveryTypes.address.price)})`,
      value: 'Доставка до личен адрес',
      active: store.deliveryTypes.address.active
    },
    {
      label: `Взимане от място (${toReadablePrice(store.deliveryTypes.pickup.price)})`,
      value: 'Взимане от място',
      active: store.deliveryTypes.pickup.active
    }
  ]
  const activeDeliveryOptions = DELIVERY_OPTIONS.filter((x) => x.active === true)

  const { setFormField, createOrder } = useCart()
  return (
    <div className={styles.form}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          createOrder()
        }}
        autoComplete='on'
      >
        <Input
          required
          title='Име и фамилия са задължителни.'
          name='name'
          label='Име и фамилия*'
          value={formValues.name}
          onChange={setFormField}
        />

        <Input
          required
          pattern='^(\+359|0)\s?8(\d{2}\s\d{3}\d{3}|[789]\d{7})$'
          title='Телефонният номер следва да е във валиден формат (0885929379 / +359885929379)'
          name='phoneNumber'
          label='Телефон*'
          value={formValues.phoneNumber}
          onChange={setFormField}
        />

        <Select
          label='Начин на доставка*'
          options={activeDeliveryOptions}
          value={formValues.deliveryType}
          name='deliveryType'
          onChange={setFormField}
          required
        />

        <TextArea
          required
          name='address'
          title='Адресът е задължителен'
          onChange={setFormField}
          label='Адрес*'
          value={formValues.address}
          placeholder='Адрес за доставка'
        />

        <TextArea
          title='Коментар'
          name='comment'
          label='Коментар'
          onChange={setFormField}
          value={formValues.comment}
          placeholder='Коментари към поръчката'
        />

        <div className={styles.submitBtn}>
          <Button onClick={() => {}} loading={loading} block htmlType='submit'>
            Поръчай
          </Button>
        </div>
      </form>
    </div>
  )
}
