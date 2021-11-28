import { GetServerSideProps } from 'next'
import { StoreState } from '../../store'
import { ProductService } from '../service'

export const getServerSidePropsProductPage: GetServerSideProps = async (ctx) => {
  const {
    params: { id }
  } = ctx
  try {
    const resp = await ProductService.getProductPageData(id as string)
    if (resp.data) {
      const { store, product, suggestions } = resp.data
      const initialStateStore: StoreState = {
        store,
        currentProduct: product,
        currentCategory: null
      }
      const initialReduxState = {
        store: initialStateStore
      }
      return { props: { initialReduxState, suggestions } }
    }
    return {
      notFound: true
    }
  } catch (e) {
    return {
      notFound: true
    }
  }
}
