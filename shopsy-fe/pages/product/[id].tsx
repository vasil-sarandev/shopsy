import { FC, useEffect } from 'react'
import { CartContainer } from '../../feature/cart'
import { getServerSidePropsProductPage, ProductPageContainer } from '../../feature/product'
import { LayoutStorePages, StoreState } from '../../feature/store'
import { applyStoreTheme, PageSeo, Product } from '../../shared'

interface Props {
  suggestions: Product[]
  initialReduxState: {
    store: StoreState
  }
}

const ProductPage: FC<Props> = ({ initialReduxState, suggestions }) => {
  // initialReduxState returned from getServerSideProps contains store and current product.
  const { currentProduct: product, store } = initialReduxState.store
  const pageTitle = `${product.name} от ${store.name}`
  const pageImage = product.images[0]

  useEffect(() => {
    applyStoreTheme(store.theme)
  }, [store])

  return (
    <PageSeo title={pageTitle} image={pageImage}>
      <LayoutStorePages>
        <CartContainer />
        <ProductPageContainer product={product} suggestions={suggestions} />
      </LayoutStorePages>
    </PageSeo>
  )
}

export const getServerSideProps = getServerSidePropsProductPage

export default ProductPage
