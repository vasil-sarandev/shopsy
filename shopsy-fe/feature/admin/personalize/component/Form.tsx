import { FC } from 'react'
import { PersonalizationFormState } from '../util'
import styles from '../styles/form.module.css'
import {
  Checkbox,
  ColorPicker,
  DeliveryTypes,
  ErrorMessage,
  Input,
  TextArea,
  Upload
} from '../../../../shared'

interface Props {
  formState: PersonalizationFormState
  handleChange: (which: string, val: any) => void
  validationErrors: any
}

const DELIVERY_TYPES = [
  { label: 'До офис на speedy', key: 'speedy' },
  { label: 'До офис на econt', key: 'econt' },
  { label: 'До личен адрес', key: 'address' },
  { label: 'Взимане от място', key: 'pickup' }
]

export const PersonalizationForm: FC<Props> = ({ formState, handleChange, validationErrors }) => {
  const handleChangeDeliveryType = (deliveryType: string) => (which: string, val: any) => {
    const newDeliveryTypes: DeliveryTypes = {
      ...formState.deliveryTypes,
      [deliveryType]: { ...formState.deliveryTypes[deliveryType], [which]: val }
    }
    handleChange('deliveryTypes', newDeliveryTypes)
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
    <div className={styles.container}>
      <div className={styles.firstSection}>
        <div className={styles.sectionTitle}>Детайли</div>
        <Input
          label='Име на магазин'
          value={formState.name}
          placeholder='Пример: Starbucks - Paradise Mall'
          name='name'
          autoComplete='off'
          onChange={handleChange}
        />

        {validationErrors.name && (
          <div className={styles.inputError}>
            <ErrorMessage error={{ message: validationErrors.name }} />
          </div>
        )}

        <Input
          label='Идентификатор'
          value={formState.slug}
          name='slug'
          onChange={handleChange}
          autoComplete='off'
          placeholder='Пример: starbucks-paradise'
          disabled
        />

        {validationErrors.slug && (
          <div className={styles.inputError}>
            <ErrorMessage error={{ message: validationErrors.slug }} />
          </div>
        )}
      </div>

      <div className={styles.sectionsContainer}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Персонализация</div>
          <ColorPicker
            label='Основен цвят'
            value={formState.primaryColor}
            onChange={handleChange}
            name='primaryColor'
          />
          <ColorPicker
            label='Вторичен цвят'
            value={formState.secondaryColor}
            onChange={handleChange}
            name='secondaryColor'
          />
          <div className={styles.inputHelp}>
            Основен цвят е цветът за бутони и заглавия в магазина ви, а вторичният е за акценти.
          </div>
          <Upload
            name='logo'
            onChange={handleChange}
            value={formState.logo}
            aspect={1 / 1}
            label='Logo'
          />

          <TextArea
            label='Съобщение'
            value={formState.announcement}
            placeholder='Пример: Вече предлагаме бургерите ни и с веган месо от Impossible Foods'
            name='announcement'
            onChange={handleChange}
          />
          <div className={styles.inputHelp}>
            Съобщението, което ще виждат клиентите като достъпят магазина ви.
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Доставки</div>
          <Checkbox name='enableOrders' value={formState.enableOrders} onChange={handleChange}>
            Позволи поръчки
          </Checkbox>
          <div className={styles.inputHelp}>
            Ако ще ползвате платформата само за дигитален каталог - без да приемате поръчки,
            оставете този бутон неактивен. Може да се промени по всяко време.
          </div>
          {formState.enableOrders && (
            <div className={styles.deliveryTypesWrapper}>
              <div className={styles.deliveriesHeading}>Типове доставка</div>
              {deliveryTypes}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
