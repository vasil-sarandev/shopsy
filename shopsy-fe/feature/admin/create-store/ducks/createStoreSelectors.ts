import { RootState } from '../../../state'
import { CreateStoreFormState, ValidateInformationErrors } from './createStoreReducer'

export const getCreateStoreFormState = (state: RootState): CreateStoreFormState =>
  state.admin.createStore.formState

export const getCreateStoreValidationErrors = (state: RootState): ValidateInformationErrors =>
  state.admin.createStore.validationErrors

export const getValidateFormLoading = (state: RootState): boolean =>
  state.admin.createStore.validateFormLoading

export const getCreateStoreLoading = (state: RootState): boolean =>
  state.admin.createStore.createStoreLoading

export const getCreateStoreRedirectUrl = (state: RootState): string =>
  state.admin.createStore.redirectUrl
