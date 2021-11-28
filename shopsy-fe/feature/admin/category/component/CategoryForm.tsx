import { FC } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty } from 'lodash'
import styles from '../styles/form.module.css'
import { getCategoryFormState, useCategory } from '../ducks'
import { Input, Upload, Button, Card } from '../../../../shared'

interface Props {
  buttonLabel: string
  handleSubmit: () => void
  isLoading: boolean
}

export const CategoryForm: FC<Props> = ({ buttonLabel, handleSubmit, isLoading }) => {
  const formState = useSelector(getCategoryFormState)
  const { setFormField } = useCategory()
  const disableButton = isEmpty(formState.title)
  return (
    <div className={styles.form}>
      <Card title='Снимкa' style={{ marginBottom: 'var(--gutter)' }}>
        <Upload
          name='image'
          value={formState.image}
          listType='picture'
          onChange={setFormField}
          aspect={1 / 1}
        />
      </Card>
      <Card title='Информация за категория' style={{ marginBottom: 'var(--gutter)' }}>
        <Input label='Име' name='title' value={formState.title} onChange={setFormField} />
      </Card>
      <Button onClick={handleSubmit} disabled={disableButton} loading={isLoading} block>
        {buttonLabel}
      </Button>
    </div>
  )
}
