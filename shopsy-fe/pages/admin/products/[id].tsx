import { useRouter } from 'next/router'
import { FC } from 'react'
import { LayoutContainer } from '../../../feature/admin/layout'
import { EditProductContainer } from '../../../feature/admin/product'
import { withAuthentication, withStoreOwner } from '../../../feature/auth'
import { PageSeo } from '../../../shared'

interface Props {}

const ProductPage: FC<Props> = () => {
  const router = useRouter()
  const {
    query: { id }
  } = router
  if (!id) return null
  return (
    <PageSeo title='Редакция на продукт | Shopsy'>
      <LayoutContainer title='Редакция на продукт'>
        {id && <EditProductContainer id={id as string} />}
      </LayoutContainer>
    </PageSeo>
  )
}

export default withAuthentication(withStoreOwner(ProductPage))
