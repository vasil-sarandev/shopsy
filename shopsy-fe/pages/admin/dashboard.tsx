import { FC } from 'react'
import { DashboardContainer } from '../../feature/admin/dashboard'
import { LayoutContainer } from '../../feature/admin/layout'
import { withAuthentication, withStoreOwner } from '../../feature/auth'
import { PageSeo } from '../../shared'

interface Props {}

const Dashboard: FC<Props> = () => (
  <PageSeo title='Админ | Shopsy'>
    <LayoutContainer title='Админ'>
      <DashboardContainer />
    </LayoutContainer>
  </PageSeo>
)

export default withAuthentication(withStoreOwner(Dashboard))
