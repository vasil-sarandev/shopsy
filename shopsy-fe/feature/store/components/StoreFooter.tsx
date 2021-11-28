import { FC } from 'react'
import { AppFooter, STATIC_ROUTES as routes } from '../../../shared'

interface Props {}

const FOOTER_LINKS = [
  { as: routes.homepage.as, href: routes.homepage.href, label: 'Регистрация на магазин' },
  { as: routes.termsOfUse.as, href: routes.termsOfUse.href, label: 'Условия за ползване' }
]

export const StoreFooter: FC<Props> = () => <AppFooter links={FOOTER_LINKS} />
