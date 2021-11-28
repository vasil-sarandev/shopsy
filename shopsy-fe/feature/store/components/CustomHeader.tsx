import { FC } from 'react'
import { useSelector } from 'react-redux'
import { getStore } from '../ducks'
import styles from '../styles/customHeader.module.css'

interface Props {}

export const CustomHeader: FC<Props> = () => {
  const store = useSelector(getStore)
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.venueTitle}>{store.name}</div>
        {store.announcement && <div className={styles.announcement}>{store.announcement}</div>}
      </div>
    </div>
  )
}
