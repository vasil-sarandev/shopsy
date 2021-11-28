import { useAuth0 } from '@auth0/auth0-react'
import Image from 'next/image'
import { FC } from 'react'
import { Button } from '../../../shared'
import styles from '../styles/header.module.css'

interface Props {}

export const Header: FC<Props> = () => {
  const { loginWithRedirect } = useAuth0()

  const handleSignIn = () => loginWithRedirect()

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <Image width={100} height={32} src={process.env.logo_url} alt='logo' />
        </div>
        <div className={styles.buttons}>
          <div className={styles.logIn}>
            <Button onClick={handleSignIn} block>
              Влез
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
