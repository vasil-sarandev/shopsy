import { ErrorType } from '../../../../shared'
import { RootState } from '../../../state'
import { ProductFormState } from './productReducer'

export const getProductFormState = (state: RootState): ProductFormState =>
  state.admin.product.formState

export const getLoadingCreateProduct = (state: RootState): boolean =>
  state.admin.product.loadingCreateProduct

export const getLoadingUpdateProduct = (state: RootState): boolean =>
  state.admin.product.loadingUpdateProduct

export const getLoadingGetProduct = (state: RootState): boolean =>
  state.admin.product.loadingGetProduct
export const getGetProductError = (state: RootState): ErrorType =>
  state.admin.product.getProductError
