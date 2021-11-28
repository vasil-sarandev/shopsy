import { useAuth0 } from '@auth0/auth0-react'
import { FC } from 'react'
import { Button, CustomLink, STATIC_ROUTES } from '../../../shared'
import styles from '../styles/hero.module.css'

interface Props {}

export const HeroBanner: FC<Props> = () => {
  const { loginWithRedirect } = useAuth0()
  const handleSignUp = () => loginWithRedirect({ screen_hint: 'signup' })
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Започнете да продавате онлайн още днес!</h1>
      </div>
      <div className={styles.hint}>
        <h3>
          Регистрирайте се днес и използвайте Shopsy завинаги безплатно. Без кредитна карта, без
          тестов период, без обвързвания.
        </h3>
      </div>
      <div className={styles.cta}>
        <div className={styles.btn}>
          <Button onClick={handleSignUp}>Започни безплатно</Button>
        </div>
        <div className={styles.signUp}>
          <CustomLink as={STATIC_ROUTES.demo.as} href={STATIC_ROUTES.demo.href}>
            <Button type='link' onClick={() => {}}>
              или разгледай демото
            </Button>
          </CustomLink>
        </div>
      </div>
    </div>
  )
}
