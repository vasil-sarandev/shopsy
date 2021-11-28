import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../../state'
import { CreateStoreService } from '../service'
import { createStoreInfo } from '../util'
import { CreateStoreState } from './createStoreReducer'

export type formFieldKeys =
  | 'name'
  | 'slug'
  | 'logo'
  | 'primaryColor'
  | 'secondaryColor'
  | 'deliveryTypes'
export type validationErrorKeys = 'name' | 'slug'

interface SetFormFieldAction {
  which: formFieldKeys
  value: any
}

interface SetValidationErrorAction {
  which: validationErrorKeys
  value: string
}

export const setFormField = (
  state: CreateStoreState,
  { payload }: PayloadAction<SetFormFieldAction>
) => {
  const { which, value } = payload
  const newFormState = { ...state.formState, [which]: value }
  state.formState = newFormState
}

export const setValidationError = (
  state: CreateStoreState,
  { payload }: PayloadAction<SetValidationErrorAction>
) => {
  const { which, value } = payload
  const newValidationErrors = { ...state.validationErrors, [which]: value }
  state.validationErrors = newValidationErrors
}

export const setValidateFormLoading = (
  state: CreateStoreState,
  { payload }: PayloadAction<boolean>
) => {
  state.validateFormLoading = payload
}

export const createStore = createAsyncThunk('createStore/createStore', async (_, { getState }) => {
  const state: RootState = getState() as RootState
  const storeObject = createStoreInfo(state.admin.createStore.formState)
  await CreateStoreService.createStore(storeObject)
})
