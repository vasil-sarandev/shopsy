import { useAppDispatch } from '../../../state'
import {
  formFieldKeys,
  validationErrorKeys,
  createStore as createStoreAction
} from './createStoreActions'
import { createStoreActions } from './createStoreReducer'

interface UseCreateStore {
  setFormField: (which: formFieldKeys, value: any) => void
  setValidationError: (which: validationErrorKeys, value: any) => void
  setValidateFormLoading: (value: boolean) => void
  createStore: () => void
}

export const useCreateStore = (): UseCreateStore => {
  const dispatch = useAppDispatch()

  const setFormField = (which: formFieldKeys, value: any) => {
    dispatch(createStoreActions.setFormField({ which, value }))
  }

  const setValidationError = (which: validationErrorKeys, value: any) => {
    dispatch(createStoreActions.setValidationError({ which, value }))
  }

  const setValidateFormLoading = (val: boolean) => {
    dispatch(createStoreActions.setValidateFormLoading(val))
  }

  const createStore = () => {
    dispatch(createStoreAction())
  }

  return {
    setFormField,
    setValidationError,
    setValidateFormLoading,
    createStore
  }
}
