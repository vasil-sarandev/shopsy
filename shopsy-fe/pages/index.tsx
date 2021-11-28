import { FC } from 'react'
import { HomepageContainer } from '../feature/homepage/container'
import { PageSeo } from '../shared'

interface Props {}

const Home: FC<Props> = () => (
  <PageSeo
    title='Shopsy | Създайте си онлайн магазин безплатно днес.'
    description='Shopsy помага на българските малки бизнеси и търговци възможно най-лесно да продават онлайн.'
  >
    <HomepageContainer />
  </PageSeo>
)

export default Home
