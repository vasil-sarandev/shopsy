import { ErrorType } from '../../../../shared'
import { RootState } from '../../../state'
import { CategoryFormState } from './categoryReducer'

export const getCategoryFormState = (state: RootState): CategoryFormState =>
  state.admin.category.formState

export const getCategoryCreateLoading = (state: RootState): boolean =>
  state.admin.category.loadingCreateCategory
export const getLoadingUpdateCategory = (state: RootState): boolean =>
  state.admin.category.loadingUpdateCategory
export const getLoadingGetCategory = (state: RootState): boolean =>
  state.admin.category.loadingGetCategory

export const getGetCategoryError = (state: RootState): ErrorType =>
  state.admin.category.getCategoryError
