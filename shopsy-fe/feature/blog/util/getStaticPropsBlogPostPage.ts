import { GetStaticProps } from 'next'
import { BlogService } from '../service'

export const getStaticPropsBlogPostPage: GetStaticProps = async (ctx) => {
  const {
    params: { slug }
  } = ctx
  // get article by slug
  const post = await BlogService.getPostBySlug(slug as string)

  return { props: { blogPost: post.data } }
}
