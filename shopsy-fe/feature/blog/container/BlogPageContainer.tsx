import { FC } from 'react'
import { BlogBox, LayoutBlogPages } from '../components'
import { BlogPost } from '../model'
import styles from '../styles/blogPage.module.css'

interface Props {
  blogPosts: BlogPost[]
}

export const BlogPageContainer: FC<Props> = ({ blogPosts }) => {
  const blogBoxes = blogPosts.map((item) => <BlogBox blogPost={item} key={item.slug} />)
  return (
    <LayoutBlogPages>
      <div className={styles.container}>
        <h1>Публикации от Shopsy</h1>
        <div className={styles.boxesContainer}>{blogBoxes}</div>
      </div>
    </LayoutBlogPages>
  )
}
