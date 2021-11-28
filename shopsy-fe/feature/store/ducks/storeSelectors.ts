import { Category, Product, Store } from '../../../shared'
import { RootState } from '../../state'

export const getStore = (state: RootState): Store => state.store.store
export const getCurrentProduct = (state: RootState): Product => state.store.currentProduct
export const getCurrentCategory = (state: RootState): Category => state.store.currentCategory
