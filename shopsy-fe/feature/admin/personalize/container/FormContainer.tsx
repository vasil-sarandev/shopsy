import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '../../../../shared'
import styles from '../styles/form.module.css'
import {
  CreateStoreService,
  getCreateStoreValidationErrors,
  getValidateFormLoading,
  useCreateStore
} from '../../create-store'
import { PersonalizationForm } from '../component'
import { PersonalizationFormState } from '../util'
import { useSubmitProfile } from '../hook'
import { shouldDisableSubmitPersonalizeForm } from '../service'

interface Props {
  initialData: PersonalizationFormState
  refetchData: () => void
}

export const PersonalizeFormContainer: FC<Props> = ({ initialData, refetchData }) => {
  const { isLoading, submitProfile } = useSubmitProfile()
  const [submitDisabled, setSubmitDisabled] = useState(true)
  const validateLoading = useSelector(getValidateFormLoading)
  const validationErrors = useSelector(getCreateStoreValidationErrors)

  const [formState, setFormState] = useState(initialData)
  const handleChange = (which, value) => {
    setFormState((prevState) => ({ ...prevState, [which]: value }))
  }
  const { setValidationError, setValidateFormLoading } = useCreateStore()

  useEffect(() => {
    setValidateFormLoading(true)
    // doing this because validation is debounced.
    CreateStoreService.validateForm(formState, setValidationError, setValidateFormLoading, {
      name: initialData.name,
      slug: initialData.slug
    })
  }, [formState])

  useEffect(() => {
    setSubmitDisabled(shouldDisableSubmitPersonalizeForm(formState, validationErrors, initialData))
  }, [validationErrors, formState])

  const handleSubmit = async () => {
    await submitProfile(formState)
    refetchData()
  }
  return (
    <>
      <PersonalizationForm
        validationErrors={validationErrors}
        formState={formState}
        handleChange={handleChange}
      />
      <div className={styles.btnContainer}>
        <Button
          onClick={handleSubmit}
          disabled={submitDisabled || validateLoading}
          block
          loading={isLoading}
        >
          Запази промените
        </Button>
      </div>
    </>
  )
}
