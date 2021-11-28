import { FC } from 'react'
import { LayoutContainer } from '../../../feature/admin/layout'
import { AllOrdersContainer } from '../../../feature/admin/orders'
import { withAuthentication, withStoreOwner } from '../../../feature/auth'
import { PageSeo } from '../../../shared'

interface Props {}

const OrdersPage: FC<Props> = () => (
  <PageSeo title='Всички поръчки | Shopsy'>
    <LayoutContainer title='Поръчки'>
      <AllOrdersContainer />
    </LayoutContainer>
  </PageSeo>
)

export default withAuthentication(withStoreOwner(OrdersPage))
