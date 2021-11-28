/* eslint-disable no-undef */
const { createClient } = require('contentful')
const { formatBlogSlugs, formatSinglePostResp, formatBlogPostsResp } = require('./mapper')

const CONTENT_TYPES = {
    BlogPost: 'blogPost',
}

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID
const CONTENTFUL_API_KEY = process.env.CONTENTFUL_API_KEY

const contentful_client = createClient({
    space: CONTENTFUL_SPACE_ID,
    accessToken: CONTENTFUL_API_KEY
})

const fetchBlogSlugs = async () => {
    const response = await contentful_client.getEntries({
        content_type: CONTENT_TYPES.BlogPost,
        select: 'fields.slug',
        limit: 200
    })
    return formatBlogSlugs(response)
}


const fetchPostBySlug = async (slug) => {
    const response = await contentful_client.getEntries({
        content_type: CONTENT_TYPES.BlogPost,
        'fields.slug[in]': slug,
        limit: 1
    })
    return formatSinglePostResp(response)
}

const fetchBlogPosts = async () => {
    const response = await contentful_client.getEntries({
        content_type: CONTENT_TYPES.BlogPost,
        order: '-sys.createdAt',
        select:
            'fields.slug,fields.title,fields.description,fields.thumbnail'
    })
    return formatBlogPostsResp(response)
}
module.exports = {
    fetchBlogSlugs,
    fetchPostBySlug,
    fetchBlogPosts
}