import { FC, useEffect } from 'react'
import { CartContainer } from '../../feature/cart'
import { CategoryPageContainer, getServerSidePropsCategoryPage } from '../../feature/category'
import { LayoutStorePages, StoreState } from '../../feature/store'
import { applyStoreTheme, Category, PageSeo } from '../../shared'

interface Props {
  category: Category
  initialReduxState: {
    store: StoreState
  }
}

const CategoryPage: FC<Props> = ({ initialReduxState }) => {
  // initialReduxState returned from getServerSideProps contains store and current product.
  const { store, currentCategory } = initialReduxState.store
  const pageTitle = `${currentCategory.title} от ${store.name}`
  const pageImage = currentCategory.image

  useEffect(() => {
    applyStoreTheme(store.theme)
  }, [store])

  return (
    <PageSeo title={pageTitle} image={pageImage}>
      <LayoutStorePages>
        <CartContainer />
        <CategoryPageContainer category={currentCategory} />
      </LayoutStorePages>
    </PageSeo>
  )
}

export const getServerSideProps = getServerSidePropsCategoryPage

export default CategoryPage
