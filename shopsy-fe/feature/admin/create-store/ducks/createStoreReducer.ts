import { createSlice } from '@reduxjs/toolkit'
// eslint-disable-next-line camelcase
import { STATIC_ROUTES, notification, DeliveryTypes, fb_event } from '../../../../shared'
import {
  setFormField,
  setValidationError,
  setValidateFormLoading,
  createStore
} from './createStoreActions'

export interface CreateStoreFormState {
  name?: string
  slug?: string
  logo?: any
  primaryColor: string
  secondaryColor: string
  enableOrders: boolean
  announcement?: string
  deliveryTypes: DeliveryTypes
}

export interface ValidateInformationErrors {
  name?: string
  slug?: string
}

export interface CreateStoreState {
  formState: CreateStoreFormState
  validationErrors: ValidateInformationErrors
  validateFormLoading: boolean
  createStoreLoading: boolean
  redirectUrl: string
}

export const defaultDeliveryTypesValues: DeliveryTypes = {
  speedy: { active: true, price: 3.49 },
  econt: { active: true, price: 5.99 },
  address: { active: true, price: 6.99 },
  pickup: { active: false, price: 0.0 }
}

const initialState: CreateStoreState = {
  formState: {
    enableOrders: true,
    primaryColor: '#ff6900',
    secondaryColor: '#ff6a5d',
    deliveryTypes: defaultDeliveryTypesValues,
    logo: []
  },
  createStoreLoading: false,
  validationErrors: {},
  validateFormLoading: false,
  redirectUrl: ''
}
export { initialState as initialStateCreateStore }

export const { reducer: createStoreReducer, actions: createStoreActions } = createSlice({
  name: 'createStore',
  initialState,
  reducers: {
    setFormField,
    setValidationError,
    setValidateFormLoading
  },
  extraReducers: (builder) => {
    builder.addCase(createStore.pending, (state) => {
      state.createStoreLoading = true
    })
    builder.addCase(createStore.fulfilled, (state) => {
      // facebook event.
      fb_event('StartTrial', { value: '0.00', currency: 'USD', predicted_ltv: '0.00' })
      state.createStoreLoading = false
      state.formState = initialState.formState
      state.validateFormLoading = false
      state.validationErrors = {}
      state.redirectUrl = STATIC_ROUTES.dashboard.as
      notification.success({ message: 'Магазинът беше успешно създаден.' })
    })
    builder.addCase(createStore.rejected, (state) => {
      state.createStoreLoading = false
      notification.error({
        message: 'Възникна проблем.',
        description:
          'Моля опитайте по-късно. Ако проблемът продължава да съществува, моля свържете се с нас.',
        duration: 15
      })
    })
  }
})
