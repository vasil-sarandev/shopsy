import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../../../shared'
import { RootState } from '../../state'
import { CartService } from '../service'
import { addProductToCart, createOrderInfo, decreaseProductQuantity } from '../util'
import { CartState } from './cartReducer'

export type formFieldKeys = 'comment' | 'name' | 'address' | 'phoneNumber' | 'deliveryType'

interface ProductAction {
  product: Product
}

interface SetFormFieldAction {
  which: formFieldKeys
  value: string
}

export const addProduct = (state: CartState, { payload }: PayloadAction<ProductAction>) => {
  const { product } = payload
  const newCart = addProductToCart(product, state.cart)
  state.cart = newCart
}

export const removeProduct = (state: CartState, { payload }: PayloadAction<ProductAction>) => {
  const { product } = payload
  const newCart = decreaseProductQuantity(product, state.cart)
  state.cart = newCart
}

export const setCartVisible = (state: CartState, { payload }: PayloadAction<boolean>) => {
  state.visible = payload
}

export const setFormField = (state: CartState, { payload }: PayloadAction<SetFormFieldAction>) => {
  const { which, value } = payload
  const newFormState = { ...state.formState, [which]: value }
  state.formState = newFormState
}

export const createOrder = createAsyncThunk('cart/createOrder', async (_, { getState }) => {
  const state: RootState = getState() as RootState
  const order = createOrderInfo(state)
  const resp: string = (await CartService.createOrder(order)).data
  return resp
})
