import { FC } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty } from 'lodash'
import styles from '../styles/form.module.css'
import { Input, Upload, Button, TextArea, AsyncSelect, Card, Checkbox } from '../../../../shared'
import { getProductFormState, useProduct } from '../ducks'
import { ProductService } from '../service'

interface Props {
  buttonLabel: string
  handleSubmit: () => void
  isLoading: boolean
}

export const ProductForm: FC<Props> = ({ buttonLabel, handleSubmit, isLoading }) => {
  const { setFormField } = useProduct()
  const formState = useSelector(getProductFormState)

  const disableSubmit =
    !formState.price ||
    isEmpty(formState.quantity) ||
    isEmpty(formState.category) ||
    isEmpty(formState.images)

  return (
    <div className={styles.form}>
      <Card title='Снимки (до 8 изображения)*' style={{ marginBottom: 'var(--gutter)' }}>
        <Upload
          name='images'
          value={formState.images}
          onChange={setFormField}
          listType='picture'
          aspect={1 / 1}
          maxCount={8}
        />
      </Card>
      <Card title='Информация за продукт'>
        <>
          <Input label='Име*' name='name' value={formState.name} onChange={setFormField} />
          <Checkbox name='featured' value={formState.featured} onChange={setFormField}>
            Препоръчан продукт
          </Checkbox>
          <AsyncSelect
            label='Категория*'
            name='category'
            value={formState.category}
            onChange={setFormField}
            loadOptions={async () => {
              const resp = await ProductService.getCategoryOptions()
              return resp.data
            }}
          />
          <Input
            type='number'
            label='Цена*'
            autoComplete='off'
            name='price'
            value={formState.price}
            onChange={setFormField}
          />
          <Input
            label='Количество*'
            placeholder='Пример: 250ml.'
            autoComplete='off'
            name='quantity'
            value={formState.quantity}
            onChange={setFormField}
          />
          <TextArea
            label='Описание'
            placeholder='Пример: Поднася се с гарнитура картофки.'
            name='description'
            value={formState.description}
            onChange={setFormField}
          />
        </>
      </Card>
      <div className={styles.submit}>
        <Button onClick={handleSubmit} disabled={disableSubmit} loading={isLoading} block>
          {buttonLabel}
        </Button>
      </div>
    </div>
  )
}
