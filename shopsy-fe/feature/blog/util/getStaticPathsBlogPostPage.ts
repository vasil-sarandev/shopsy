import { GetStaticPaths } from 'next'
import { BlogService } from '../service'

export const getStaticPathsBlogPostPage: GetStaticPaths = async () => {
  const slugs = await BlogService.getSlugs()
  const paths = slugs.data.map((x) => ({ params: { slug: x } }))
  return {
    paths,
    fallback: false
  }
}
