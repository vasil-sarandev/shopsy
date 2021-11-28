import { FC, useEffect } from 'react'
import { CartContainer } from '../feature/cart'
import {
  CustomHeader,
  getServerSidePropsStorePage,
  LayoutStorePages,
  StoreHeader,
  StorePageContainer,
  StoreState
} from '../feature/store'
import { applyStoreTheme, Category, PageSeo, Product } from '../shared'

interface Props {
  categories: Array<Category>
  products: Array<Product>
  initialReduxState: {
    store: StoreState
  }
}

const StorePage: FC<Props> = ({ initialReduxState, categories, products }) => {
  // initialReduxState returned from getServerSideProps contains store
  const { store } = initialReduxState.store
  const pageTitle = `Поръчайте онлайн от ${store.name}`
  const pageDescription = store.announcement
  const pageImage = store.logo

  useEffect(() => {
    applyStoreTheme(store.theme)
  }, [store])

  return (
    <PageSeo title={pageTitle} image={pageImage} description={pageDescription}>
      <StoreHeader />
      <LayoutStorePages hasHeader={false}>
        <CustomHeader />
        <CartContainer />
        <StorePageContainer categories={categories} products={products} />
      </LayoutStorePages>
    </PageSeo>
  )
}

export const getServerSideProps = getServerSidePropsStorePage

export default StorePage
