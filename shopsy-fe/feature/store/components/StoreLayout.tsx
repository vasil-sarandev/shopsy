import { FC, ReactChild } from 'react'
import Div100vh from 'react-div-100vh'
import { motion } from 'framer-motion'
import styles from '../styles/layout.module.css'
import { StoreHeader } from './StoreHeader'
import { StoreFooter } from './StoreFooter'

interface Props {
  hasHeader?: boolean
  hasFooter?: boolean
  restrictWidth?: boolean
  children: ReactChild | ReactChild[]
}

export const LayoutStorePages: FC<Props> = ({
  hasHeader = true,
  hasFooter = true,
  restrictWidth = true,
  children
}) => {
  const layoutClass = `${styles.layoutContainer} ${restrictWidth ? styles.restrict : ' '}`
  return (
    <Div100vh style={{ minHeight: '100rvh' }}>
      <div className={layoutClass}>
        {hasHeader && <StoreHeader />}
        <motion.div
          className={styles.motionDiv}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <main className={styles.layoutMain}>{children}</main>
        </motion.div>
        {hasFooter && <StoreFooter />}
      </div>
    </Div100vh>
  )
}
