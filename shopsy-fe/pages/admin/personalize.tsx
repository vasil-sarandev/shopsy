import { FC } from 'react'
import { LayoutContainer } from '../../feature/admin/layout'
import { PersonalizeContainer } from '../../feature/admin/personalize'
import { withAuthentication, withStoreOwner } from '../../feature/auth'
import { PageSeo } from '../../shared'

interface Props {}

const PersonalizationPage: FC<Props> = () => (
  <PageSeo title='Персонализиране | Shopsy'>
    <LayoutContainer title='Персонализиране'>
      <PersonalizeContainer />
    </LayoutContainer>
  </PageSeo>
)

export default withAuthentication(withStoreOwner(PersonalizationPage))
