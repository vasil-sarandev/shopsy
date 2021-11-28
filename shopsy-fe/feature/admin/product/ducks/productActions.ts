import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../../state'
import { ProductService } from '../service'
import { createProductInfo, transformProductResponse } from '../util'
import { ProductState } from './productReducer'

export type formFieldKeys = 'name' | 'image' | 'details' | 'price' | 'quantity' | 'category'

interface SetFormFieldAction {
  which: formFieldKeys
  value: any
}

export const setFormField = (
  state: ProductState,
  { payload }: PayloadAction<SetFormFieldAction>
) => {
  const { which, value } = payload
  const newFormState = { ...state.formState, [which]: value }
  state.formState = newFormState
}

export const setLoadingCreateProduct = (
  state: ProductState,
  { payload }: PayloadAction<boolean>
) => {
  state.loadingCreateProduct = payload
}

export const resetForm = (state: ProductState) => {
  state.formState = {
    name: null,
    images: [],
    description: null,
    price: null,
    quantity: null,
    featured: false,
    category: null
  }
}

export const createProduct = createAsyncThunk('product/create', async (_, { getState }) => {
  const state: RootState = getState() as RootState
  const productObject = createProductInfo(state.admin.product.formState)
  await ProductService.createProduct(productObject)
})

export const updateProduct = createAsyncThunk(
  'product/update',
  async (id: string, { getState }) => {
    const state: RootState = getState() as RootState
    const productObject = createProductInfo(state.admin.product.formState)
    await ProductService.updateProduct(id, productObject)
  }
)

export const getProduct = createAsyncThunk('product/get', async (id: string, _) => {
  const resp = await ProductService.getProduct(id)
  return transformProductResponse(resp.data)
})
