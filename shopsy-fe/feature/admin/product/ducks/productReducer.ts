import { createSlice } from '@reduxjs/toolkit'
import { notification } from 'antd'
import { ErrorType } from '../../../../shared'
import {
  setFormField,
  setLoadingCreateProduct,
  createProduct,
  getProduct,
  updateProduct,
  resetForm
} from './productActions'

export interface ProductFormState {
  name: string
  images: Array<any>
  description: string
  price: number
  quantity: string
  featured: boolean
  category: { label: string; value: string }
}

export interface ProductState {
  formState: ProductFormState
  loadingCreateProduct: boolean
  loadingUpdateProduct: boolean
  loadingGetProduct: boolean
  getProductError: ErrorType
}

const initialState: ProductState = {
  formState: {
    name: null,
    images: [],
    description: null,
    price: null,
    quantity: null,
    category: null,
    featured: false
  },
  loadingCreateProduct: false,
  loadingGetProduct: true,
  loadingUpdateProduct: false,
  getProductError: null
}
export { initialState as initialStateProduct }

export const { reducer: productReducer, actions: productActions } = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setFormField,
    setLoadingCreateProduct,
    resetForm
  },
  extraReducers: (builder) => {
    // create product
    builder.addCase(createProduct.pending, (state) => {
      state.loadingCreateProduct = true
    })
    builder.addCase(createProduct.fulfilled, (state) => {
      state.loadingCreateProduct = false
      state.formState = initialState.formState
      notification.success({ message: 'Продуктът беше успешно създаден.' })
    })
    builder.addCase(createProduct.rejected, (state, { error }) => {
      state.loadingCreateProduct = false
      notification.error({
        message: `Възникна проблем: ${error.message}`,
        description:
          'Моля опитайте по-късно. Ако проблемът продължава да съществува, моля свържете се с нас.',
        duration: 15
      })
    })
    // get product
    builder.addCase(getProduct.pending, (state) => {
      state.loadingGetProduct = true
    })
    builder.addCase(getProduct.fulfilled, (state, { payload }) => {
      state.loadingGetProduct = false
      state.formState = payload
    })
    builder.addCase(getProduct.rejected, (state, { error }) => {
      state.loadingGetProduct = false
      state.getProductError = { message: error.message }
      notification.error({
        message: `Възникна проблем: ${error.message}`,
        description:
          'Моля опитайте по-късно. Ако проблемът продължава да съществува, моля свържете се с нас.',
        duration: 15
      })
    })
    // update product

    builder.addCase(updateProduct.pending, (state) => {
      state.loadingUpdateProduct = true
    })
    builder.addCase(updateProduct.fulfilled, (state, _) => {
      state.loadingUpdateProduct = false
      notification.success({ message: 'Продуктът беше обновен успешно!', duration: 5 })
    })
    builder.addCase(updateProduct.rejected, (state, { error }) => {
      state.loadingUpdateProduct = false
      notification.error({
        message: `Възникна проблем: ${error.message}`,
        description:
          'Моля опитайте по-късно. Ако проблемът продължава да съществува, моля свържете се с нас.',
        duration: 15
      })
    })
  }
})
