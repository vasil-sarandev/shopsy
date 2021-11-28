import { GetStaticProps } from 'next'
import { BlogService } from '../service'

export const getStaticPropsBlogPage: GetStaticProps = async () => {
  const blogPosts = await BlogService.getPosts()
  return { props: { blogPosts: blogPosts.data }, notFound: blogPosts.data.length === 0 }
}
