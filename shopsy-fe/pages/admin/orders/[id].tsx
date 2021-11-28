import { useRouter } from 'next/router'
import { FC } from 'react'
import { LayoutContainer } from '../../../feature/admin/layout'
import { ViewOrderContainer } from '../../../feature/admin/orders'
import { withAuthentication, withStoreOwner } from '../../../feature/auth'
import { PageSeo } from '../../../shared'

interface Props {}

const OrderPage: FC<Props> = () => {
  const router = useRouter()
  const {
    query: { id }
  } = router
  if (!id) return null
  return (
    <PageSeo title='Детайли за поръчка | Shopsy'>
      <LayoutContainer title='Детайли за поръчка'>
        <ViewOrderContainer id={id as string} />
      </LayoutContainer>
    </PageSeo>
  )
}

export default withAuthentication(withStoreOwner(OrderPage))
