import { Category, Product, Store } from '../../../shared'
import { useAppDispatch } from '../../state'
import { storeActions } from './storeReducer'

interface UseStore {
  setStore: (store: Store) => void
  setCurrentProduct: (product: Product) => void
  setCurrentCategory: (category: Category) => void
}

export const useStore = (): UseStore => {
  const dispatch = useAppDispatch()

  const setStore = (store: Store) => {
    dispatch(storeActions.setStore(store))
  }

  const setCurrentProduct = (product: Product) => {
    dispatch(storeActions.setCurrentProduct(product))
  }

  const setCurrentCategory = (category: Category) => {
    dispatch(storeActions.setCurrentCategory(category))
  }

  return { setStore, setCurrentProduct, setCurrentCategory }
}
