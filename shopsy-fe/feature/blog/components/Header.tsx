import Image from 'next/image'
import { FC } from 'react'
import { CustomLink, STATIC_ROUTES } from '../../../shared'
import styles from '../styles/header.module.css'

interface Props {}

export const Header: FC<Props> = () => (
  <div className={styles.container}>
    <div className={styles.inner}>
      <div className={styles.logo}>
        <CustomLink as={STATIC_ROUTES.homepage.as} href={STATIC_ROUTES.homepage.href}>
          <Image width={100} height={32} src={process.env.logo_url} alt='logo' />
        </CustomLink>
      </div>
    </div>
  </div>
)
