const express = require('express')
const { fetchBlogSlugs, fetchPostBySlug, fetchBlogPosts } = require('../lib/contentful/client')

const router = new express.Router()

router.get('/slugs', async (req, res) => {
    try {
        const slugs = await fetchBlogSlugs()
        res.send(slugs)
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
})


router.get('/posts', async (req, res) => {
    try {
        const posts = await fetchBlogPosts()
        res.send(posts)
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
})

router.get('/post/:slug', async (req, res) => {
    const { slug } = req.params
    try {
        const blogPost = await fetchPostBySlug(slug)
        res.send(blogPost)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

module.exports = router