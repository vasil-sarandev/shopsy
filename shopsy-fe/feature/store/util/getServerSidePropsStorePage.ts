import { GetServerSideProps } from 'next'
import { StoreState } from '../ducks'
import { StoreService } from '../service'

export const getServerSidePropsStorePage: GetServerSideProps = async (ctx) => {
  const {
    params: { store: slug }
  } = ctx
  try {
    const resp = await StoreService.getStorePageData(slug as string)
    if (resp.data) {
      const { store, categories, products } = resp.data
      const initialStateStore: StoreState = {
        store,
        currentProduct: null,
        currentCategory: null
      }
      const initialReduxState = {
        store: initialStateStore
      }
      return { props: { initialReduxState, categories, products } }
    }
    return {
      notFound: true
    }
  } catch (e) {
    if (e.message === 'Store not found.') {
      return {
        notFound: true
      }
    }
    throw new Error()
  }
}
