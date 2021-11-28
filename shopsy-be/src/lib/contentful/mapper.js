const formatBlogSlugs = (data) => {
    return data.items.map((item) => item.fields.slug)
}

const formatSinglePostResp = (data) => {
    const items = data.items.map((item) => {
        return {
            ...item.fields,
            thumbnail: item.fields.thumbnail.fields.file.url,
            metaImage: item.fields.metaImage.fields.file.url,
            date: item.sys.createdAt
        }
    })
    return items[0]
}

const formatBlogPostsResp = (data) => {
    return data.items.map((item) => {
        return {
            ...item.fields,
            thumbnail: item.fields.thumbnail.fields.file.url,
        }
    })
}

module.exports = {
    formatBlogSlugs,
    formatSinglePostResp,
    formatBlogPostsResp
}