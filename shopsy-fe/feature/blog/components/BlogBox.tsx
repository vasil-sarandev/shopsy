import { FC } from 'react'
import Image from 'next/image'
import styles from '../styles/blogBox.module.css'
import { CustomLink, STATIC_ROUTES, transformContentfulText } from '../../../shared'
import { BlogPost } from '../model'

interface Props {
  blogPost: BlogPost
}

export const BlogBox: FC<Props> = ({ blogPost }) => {
  const { slug, thumbnail, title, description } = blogPost
  const imgUrl = `https:${thumbnail}`
  const blogPostLink = {
    href: STATIC_ROUTES.blogPostPage.href,
    as: STATIC_ROUTES.blogPostPage.as.replace('[slug]', slug)
  }
  return (
    <div className={styles.blogBox}>
      <CustomLink href={blogPostLink.href} as={blogPostLink.as}>
        <>
          <div className={styles.boxContentFirst}>
            <div className={styles.boxImage}>
              <Image src={imgUrl} width='360' height='360' />
            </div>
          </div>
          <div className={styles.boxContent}>
            <div className={styles.boxTitle}>
              <h3>{transformContentfulText(title)}</h3>
            </div>
            <div className={styles.description}>{transformContentfulText(description)}</div>
          </div>
        </>
      </CustomLink>
    </div>
  )
}
