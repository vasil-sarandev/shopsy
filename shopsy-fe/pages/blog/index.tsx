import { FC } from 'react'
import { BlogPost, getStaticPropsBlogPage } from '../../feature/blog'
import { BlogPageContainer } from '../../feature/blog/container'
import { PageSeo } from '../../shared'

interface Props {
  blogPosts: BlogPost[]
}

const BlogPage: FC<Props> = ({ blogPosts }) => {
  const pageTitle = `Блог | Shopsy`
  const pageDescription = `Полезни съвети и знания за собственици на онлайн магазини.`

  return (
    <PageSeo title={pageTitle} description={pageDescription}>
      <BlogPageContainer blogPosts={blogPosts} />
    </PageSeo>
  )
}

export const getStaticProps = getStaticPropsBlogPage

export default BlogPage
