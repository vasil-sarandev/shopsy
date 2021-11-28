import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ErrorMessage, Input } from '../../../../shared'
import { getCreateStoreFormState, getCreateStoreValidationErrors, useCreateStore } from '../ducks'
import { CreateStoreService } from '../service'
import styles from '../styles/main.module.css'

interface Props {
  setNextDisabled: (boolean) => void
}

export const StoreInformation: FC<Props> = ({ setNextDisabled }) => {
  const formState = useSelector(getCreateStoreFormState)
  const validationErrors = useSelector(getCreateStoreValidationErrors)
  const { setFormField, setValidationError, setValidateFormLoading } = useCreateStore()

  useEffect(() => {
    setValidateFormLoading(true)
    // doing this because validation is debounced.
    CreateStoreService.validateForm(formState, setValidationError, setValidateFormLoading)
  }, [formState])

  useEffect(() => {
    const enableNext =
      !validationErrors.name && !validationErrors.slug && formState.name && formState.slug
    setNextDisabled(!enableNext)
  }, [validationErrors, formState])

  return (
    <div className={styles.informationWrapper}>
      <div>
        <Input
          label='Име на магазин'
          value={formState.name}
          placeholder='Пример: Starbucks - Paradise Mall'
          name='name'
          autoComplete='off'
          onChange={setFormField}
        />
        {validationErrors.name && (
          <div className={styles.inputError}>
            <ErrorMessage error={{ message: validationErrors.name }} />
          </div>
        )}
        <div className={styles.inputHelp}>Името на вашият магазин</div>
      </div>
      <div>
        <Input
          label='Идентификатор'
          value={formState.slug}
          name='slug'
          onChange={setFormField}
          autoComplete='off'
          placeholder='Пример: starbucks-paradise'
        />

        {validationErrors.slug && (
          <div className={styles.inputError}>
            <ErrorMessage error={{ message: validationErrors.slug }} />
          </div>
        )}
        <div className={styles.inputHelp}>
          Това ще е линкът за вашият магазин - https://shopsy.bg/
          {`${formState.slug ? formState.slug : 'starbucks-paradise'}`}
          <br />
          Трябва да бъде правилен URL формат. Интервали и символи, различни от латиница, са
          непозволени.
        </div>
      </div>
    </div>
  )
}
