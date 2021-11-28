import Image from 'next/image'
import { FC } from 'react'
import styles from '../styles/reverseSection.module.css'

interface Props {}

export const SecondSection: FC<Props> = () => (
  <div className={styles.container}>
    <div className={styles.left}>
      <div className={styles.heading}>Персонализирайте напълно и продавайте навсякъде!</div>
      <div className={styles.secondary}>
        През административния панел можете да персонализирате магазина си и да споделяте линкове към
        магазина си навсякъде.
      </div>
    </div>
    <div className={styles.right}>
      <Image
        src='https://shopsy.s3.eu-central-1.amazonaws.com/assets/homepage/second_section_image.png'
        height={446}
        width={893}
        alt='full personalization banner'
        layout='responsive'
      />
    </div>
  </div>
)
