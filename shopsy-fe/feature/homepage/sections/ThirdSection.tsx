import { useAuth0 } from '@auth0/auth0-react'
import Image from 'next/image'
import { FC } from 'react'
import { Button } from '../../../shared'
import styles from '../styles/section.module.css'

interface Props {}

export const ThirdSection: FC<Props> = () => {
  const { loginWithRedirect } = useAuth0()
  const handleSignUp = () => loginWithRedirect({ screen_hint: 'signup' })
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.heading}>Shopsy е неограничен!</div>
        <div className={styles.secondary}>
          Предоставяме ви неограничен брой продукти, категории и поръчки. Завинаги.
        </div>
        <div className={styles.btn}>
          <Button onClick={handleSignUp}>Започнете сега</Button>
        </div>
      </div>
      <div className={styles.right}>
        <Image
          src='https://shopsy.s3.eu-central-1.amazonaws.com/assets/homepage/third_section_image.png'
          height={774}
          width={741}
          alt='limitless banner'
          layout='responsive'
        />
      </div>
    </div>
  )
}
