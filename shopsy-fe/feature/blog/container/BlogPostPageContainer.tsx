import { FC } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { transformContentfulText } from '../../../shared'
import { LayoutBlogPages } from '../components'
import { BlogPost } from '../model'
import styles from '../styles/blogPostPage.module.css'

interface Props {
  blogPost: BlogPost
}

const documentOptions = {
  renderText: transformContentfulText,
  // this is for images. contentful is kinda dumb with em.
  renderNode: {
    // eslint-disable-next-line react/destructuring-assignment
    'embedded-asset-block': (node) => <img src={node.data.target.fields.file.url} alt='blog' />
  }
}
export const BlogPostPageContainer: FC<Props> = ({ blogPost }) => {
  const semanticBody = documentToReactComponents(blogPost.body, documentOptions)
  const blogDate = new Date(blogPost.date).toLocaleDateString('bg-BG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  return (
    <LayoutBlogPages>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            <h1>{transformContentfulText(blogPost.title)}</h1>
          </div>
          <div className={styles.credits}>
            публикувано от <b>{blogPost.author}</b> на {blogDate}
          </div>
        </div>

        <div className={styles.content}>{semanticBody}</div>
      </div>
    </LayoutBlogPages>
  )
}
