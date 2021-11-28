import { FC } from 'react'
import { LayoutContainer } from '../../../feature/admin/layout'
import { withAuthentication, withStoreOwner } from '../../../feature/auth'
import { CreateProductContainer } from '../../../feature/admin/product'
import { PageSeo } from '../../../shared'

interface Props {}

const CreateProductPage: FC<Props> = () => (
  <PageSeo title='Създаване на продукт | Shopsy'>
    <LayoutContainer title='Създаване на продукт'>
      <CreateProductContainer />
    </LayoutContainer>
  </PageSeo>
)

export default withAuthentication(withStoreOwner(CreateProductPage))
