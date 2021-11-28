import { GetServerSideProps } from 'next'
import { StoreState } from '../../store'
import { CategoryService } from '../service'

export const getServerSidePropsCategoryPage: GetServerSideProps = async (ctx) => {
  const {
    params: { id }
  } = ctx
  try {
    const resp = await CategoryService.getCategoryPageData(id as string)
    if (resp.data) {
      const { store, category } = resp.data
      const initialStateStore: StoreState = {
        store,
        currentCategory: category,
        currentProduct: null
      }
      const initialReduxState = {
        store: initialStateStore
      }
      return { props: { initialReduxState } }
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
