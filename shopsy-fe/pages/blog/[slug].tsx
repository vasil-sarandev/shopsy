import { FC } from 'react'
import { BlogPost, getStaticPropsBlogPostPage } from '../../feature/blog'
import { BlogPostPageContainer } from '../../feature/blog/container'
import { getStaticPathsBlogPostPage } from '../../feature/blog/util/getStaticPathsBlogPostPage'
import { PageSeo } from '../../shared'

interface Props {
  blogPost: BlogPost
}

const BlogPostPage: FC<Props> = ({ blogPost }) => {
  const pageTitle = `${blogPost.metaTitle ? blogPost.metaTitle : blogPost.title} | Shopsy`
  const pageDescription = `${
    blogPost.metaDescription ? blogPost.metaDescription : blogPost.description
  }`
  const pageImage = `https:${blogPost.metaImage}`

  return (
    <PageSeo title={pageTitle} image={pageImage} description={pageDescription} type='article'>
      <BlogPostPageContainer blogPost={blogPost} />
    </PageSeo>
  )
}

export const getStaticPaths = getStaticPathsBlogPostPage
export const getStaticProps = getStaticPropsBlogPostPage

export default BlogPostPage
