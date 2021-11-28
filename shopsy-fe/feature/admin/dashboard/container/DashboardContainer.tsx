import { FC } from 'react'
import { CustomLink, FetchResponseHandler } from '../../../../shared'
import styles from '../styles/container.module.css'
import { useGetSlug } from '../hook'

interface Props {}

export const DashboardContainer: FC<Props> = () => {
  const { isLoading, error, slug } = useGetSlug()

  const baseURL = process.env.baseurl_app
  const menuLink = `${baseURL}/${slug}`

  return (
    <FetchResponseHandler loading={isLoading} error={error}>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>Линк към магазина ви</div>
          <div className={styles.link}>
            <CustomLink as={menuLink} href={menuLink}>
              {menuLink}
            </CustomLink>
          </div>
        </div>
      </div>
    </FetchResponseHandler>
  )
}
