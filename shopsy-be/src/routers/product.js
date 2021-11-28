const { ObjectId } = require('bson')
const express = require('express')
const { isEmpty } = require('lodash')
const auth = require('../lib/middleware/auth')
const storeId = require('../lib/middleware/store')
const Category = require('../models/category')
const Product = require('../models/product')
const Store = require('../models/store')
const { parseProductData } = require('../util/mappers')

const router = new express.Router()

router.post('/', auth, storeId, async (req, res) => {
    try {
        const productObj = await parseProductData(req)
        const product = new Product(productObj)
        await product.save()
        res.send(product)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.post('/pagination', auth, storeId, async (req, res) => {
    const { storeId } = req
    const { filter: nameFilter, pagination: { next, limit, count } } = req.body
    try {
        const filter = { store: storeId }
        if (nameFilter) filter.name = { $regex: nameFilter, $options: 'i' }
        if (next) filter._id = { '$gt': ObjectId(next) }
        const products = await Product.find(filter).limit(limit)

        if (isEmpty(products)) return res.status(200).send({ data: [] })

        const countFilter = { store: storeId }
        if (nameFilter) countFilter.name = { $regex: nameFilter, $options: 'i' }
        const pagination = {
            count: count ? await Product.countDocuments(countFilter) : undefined,
            next: products[products.length - 1].id,
            limit: limit
        }
        res.send({ data: products, paging: pagination })
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})


router.get('/categoryOptions', auth, storeId, async (req, res) => {
    const { storeId } = req
    try {
        const categories = await Category.find({ store: storeId })
        if (!categories.length) return res.status(404).send({ message: 'You have no categories created.' })
        const categoryOptions = categories.map(x => ({ label: x.title, value: x.id }))
        res.send(categoryOptions)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.get('/:id', auth, storeId, async (req, res) => {
    const { id } = req.params
    const { storeId } = req
    try {
        const product = await Product.findOne({ _id: id, store: storeId })
        if (!product) return res.status(404).send({ message: 'Product not found.' })
        // send category as well so we can "select" it
        const productJSON = await product.toJSON()
        const categoryMatch = await Category.findOne({ _id: productJSON.category })
        const mappedCategory = { label: categoryMatch.title, value: categoryMatch.id }
        productJSON.category = mappedCategory

        res.send(productJSON)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.patch('/:id', auth, storeId, async (req, res) => {
    const { id } = req.params
    const updates = await parseProductData(req)
    try {
        const product = await Product.findOne({ _id: id, store: updates.store })
        if (!product) return res.status(404).send({ message: 'Product not found' })
        Object.keys(updates).forEach(update => product[update] = updates[update])
        await product.save()
        res.send(product)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.delete('/:id', auth, storeId, async (req, res) => {
    const { id } = req.params
    const { storeId } = req
    try {
        const deleted = await Product.findOneAndDelete({ _id: id, store: storeId })
        if (!deleted) return res.status(404).send({ message: 'Product not found.' })
        res.send(deleted)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.get('/featured/:slug', async (req, res) => {
    const { slug } = req.params
    try {
        const store = await Store.findOne({ slug: slug })
        const featuredProducts = await Product.find({ store: store._id, featured: true })
        if (featuredProducts.length === 0) {
            // send 5 random products instead of featured
            const products = await Product.find({ store: store._id })
            res.send(products)
        }
        res.send(featuredProducts)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.get('/productPage/:id', async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findOne({ _id: id })
        const store = await Store.findOne({ _id: product.store })
        let suggestions = await Product.find({ store: product.store, category: product.category, _id: { $nin: [product._id] } }).limit(4)
        if (!product || !store) return res.status(404).send({ message: 'Product not found.' })
        if (!suggestions.length) suggestions = await Product.find({ store: product.store, _id: { $nin: [product._id] } }).limit(4)
        res.send({ product, store, suggestions })
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})


module.exports = router