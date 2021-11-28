import { FC } from 'react'
import { AppFooter, STATIC_ROUTES as routes } from '../../../shared'

interface Props {}

const FOOTER_LINKS = [
  { as: routes.blogPage.as, href: routes.blogPage.href, label: 'Блог' },
  { as: routes.termsOfUse.as, href: routes.termsOfUse.href, label: 'Условия за ползване' }
]

export const Footer: FC<Props> = () => <AppFooter links={FOOTER_LINKS} />
