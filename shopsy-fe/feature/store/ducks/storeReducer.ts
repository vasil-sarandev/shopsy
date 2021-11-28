import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category, Product, Store } from '../../../shared'

export interface StoreState {
  store: Store | undefined
  currentProduct: Product
  currentCategory: Category
}

const initialState: StoreState = {
  store: null,
  currentProduct: null,
  currentCategory: null
}
export { initialState as initialStateStoreReducer }

export const { reducer: storeReducer, actions: storeActions } = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setStore: (state, { payload }: PayloadAction<Store>) => {
      state.store = payload
    },
    setCurrentProduct: (state, { payload }: PayloadAction<Product>) => {
      state.currentProduct = payload
    },
    setCurrentCategory: (state, { payload }: PayloadAction<Category>) => {
      state.currentCategory = payload
    }
  }
})
