import { useAuth0 } from '@auth0/auth0-react'
import Image from 'next/image'
import { FC } from 'react'
import { Button } from '../../../shared'
import styles from '../styles/section.module.css'

interface Props {}

export const FirstSection: FC<Props> = () => {
  const { loginWithRedirect } = useAuth0()
  const handleSignUp = () => loginWithRedirect({ screen_hint: 'signup' })
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.heading}>
          Вашият безплатен онлайн магазин е на няколко клика разстояние!
        </div>
        <div className={styles.secondary}>
          Присъединете се към стотици малки бизнеси, които се довериха на Shopsy, за да продават
          онлайн.
        </div>
        <div className={styles.btn}>
          <Button onClick={handleSignUp}>Започнете сега</Button>
        </div>
      </div>
      <div className={styles.right}>
        <Image
          src='https://shopsy.s3.eu-central-1.amazonaws.com/assets/homepage/first_section_image.png'
          height={1440}
          width={1248}
          alt='join us now banner'
          layout='responsive'
        />
      </div>
    </div>
  )
}
