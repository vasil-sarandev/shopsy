import { Product } from '../../../shared'
import { useAppDispatch } from '../../state'
import { formFieldKeys, createOrder as createOrderAction } from './cartActions'
import { cartActions } from './cartReducer'

interface UseCart {
  addProduct: (product: Product) => void
  removeProduct: (product: Product) => void
  setCartVisible: (val: boolean) => void
  setFormField: (which: formFieldKeys, value: string) => void
  createOrder: () => void
}

export const useCart = (): UseCart => {
  const dispatch = useAppDispatch()

  const addProduct = (product: Product): void => {
    dispatch(cartActions.addProduct({ product }))
  }

  const removeProduct = (product: Product): void => {
    dispatch(cartActions.removeProduct({ product }))
  }

  const setCartVisible = (val: boolean): void => {
    dispatch(cartActions.setCartVisible(val))
  }

  const setFormField = (which: formFieldKeys, value: string) => {
    dispatch(cartActions.setFormField({ which, value }))
  }

  const createOrder = () => {
    dispatch(createOrderAction())
  }

  return {
    addProduct,
    removeProduct,
    setCartVisible,
    setFormField,
    createOrder
  }
}
