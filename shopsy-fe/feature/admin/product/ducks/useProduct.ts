import { useAppDispatch } from '../../../state'
import {
  formFieldKeys,
  createProduct as createProductAction,
  getProduct as getProductAction,
  updateProduct as updateProductAction
} from './productActions'
import { productActions } from './productReducer'

interface UseProduct {
  setFormField: (which: formFieldKeys, value: any) => void
  setLoadingCreateProduct: (value: boolean) => void
  createProduct: () => void
  updateProduct: (id: string) => void
  getProduct: (id: string) => void
  resetForm: () => void
}

export const useProduct = (): UseProduct => {
  const dispatch = useAppDispatch()

  const setFormField = (which: formFieldKeys, value: any) => {
    dispatch(productActions.setFormField({ which, value }))
  }

  const setLoadingCreateProduct = (val: boolean) => {
    dispatch(productActions.setLoadingCreateProduct(val))
  }

  const createProduct = () => {
    dispatch(createProductAction())
  }

  const updateProduct = (id: string) => {
    dispatch(updateProductAction(id))
  }

  const getProduct = (id) => {
    dispatch(getProductAction(id))
  }

  const resetForm = () => {
    dispatch(productActions.resetForm())
  }

  return {
    setFormField,
    setLoadingCreateProduct,
    createProduct,
    updateProduct,
    getProduct,
    resetForm
  }
}
