import { createSlice } from '@reduxjs/toolkit'
import { notification } from 'antd'
import socketIOClient from 'socket.io-client'
import { CartProduct } from '../../../shared'
import { addProduct, createOrder, removeProduct, setCartVisible, setFormField } from './cartActions'

export interface CartFormState {
  comment?: string
  name: string
  phoneNumber: string
  address: string
  deliveryType: { label: string; value: string }
}

export interface CartState {
  cart: Array<CartProduct>
  visible: boolean
  formState: CartFormState
  createOrderLoading: boolean
}

const initialFormState: CartFormState = {
  name: null,
  phoneNumber: null,
  address: null,
  deliveryType: null
}

const initialState: CartState = {
  cart: [],
  visible: false,
  formState: initialFormState,
  createOrderLoading: false
}
export { initialState as initialStateCart }

export const { reducer: cartReducer, actions: cartActions } = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct,
    removeProduct,
    setCartVisible,
    setFormField
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.createOrderLoading = true
    })
    builder.addCase(createOrder.fulfilled, (state, { payload: storeId }) => {
      const socket = socketIOClient(process.env.api_url)
      socket.emit('order', storeId)
      state.createOrderLoading = false
      state.formState = initialFormState
      state.visible = false
      state.cart = []
      notification.success({ message: 'Успешна поръчка!' })
    })
    builder.addCase(createOrder.rejected, (state) => {
      state.createOrderLoading = false
      state.visible = false
      notification.error({
        message: 'Неуспешна поръчка.',
        description:
          'Моля опитайте по-късно. Ако проблемът продължава да съществува, моля свържете се с нас.',
        duration: 15
      })
    })
  }
})
