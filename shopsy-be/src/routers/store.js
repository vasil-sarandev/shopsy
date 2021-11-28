/* eslint-disable no-unused-vars */
const express = require('express')
const auth = require('../lib/middleware/auth')
const storeId = require('../lib/middleware/store')
const Category = require('../models/category')
const Product = require('../models/product')
const Store = require('../models/store')
const { parseStoreData } = require('../util/mappers')

const router = new express.Router()

router.post('/', auth, async (req, res) => {
    const storeObj = await parseStoreData(req)
    const store = new Store(storeObj)
    try {
        await store.save()
        res.json(store.toJSON())
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.get('/mine', auth, async (req, res) => {
    const id = req.user.sub
    try {
        const store = await Store.findOne({ owner: id })
        if (store) res.send({
            isStoreOwner: true,
            storeId: store.id
        })
        else res.send({
            isStoreOwner: false,
            storeId: null
        })
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})


router.get('/slug/mine', auth, async (req, res) => {
    const id = req.user.sub
    try {
        const store = await Store.findOne({ owner: id })
        if (store) res.send(store.slug)
        else res.status(404).send({ message: 'Store not found.' })
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.get('/all', async (req, res) => {
    try {
        const stores = await Store.find({})
        const storesSlugs = stores.map(x => x.slug)
        if (!stores) return res.status(404).send({ message: 'Stores not found.' })
        res.send(storesSlugs)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.post('/available/name', auth, async (req, res) => {
    const { name } = req.body
    try {
        const match = await Store.findOne({ name: name })
        if (match) res.send(false)
        else res.send(true)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.post('/available/slug', auth, async (req, res) => {
    const { slug } = req.body
    try {
        const match = await Store.findOne({ slug: slug })
        if (match) res.send(false)
        else res.send(true)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.get('/personalization', auth, storeId, async (req, res) => {
    const { storeId } = req
    try {
        const store = await Store.findOne({ _id: storeId })
        if (!store) return res.status(404).send({ message: 'Store not found' })
        res.json(store)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.patch('/', auth, storeId, async (req, res) => {
    const { storeId } = req
    const updates = await parseStoreData(req)
    try {
        const store = await Store.findOne({ _id: storeId })
        if (!store) return res.status(404).send({ message: 'Store not found' })
        Object.keys(updates).forEach(update => store[update] = updates[update])
        await store.save()
        res.send(store)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.get('/storePage/:slug', async (req, res) => {
    const { slug } = req.params
    try {
        const store = await Store.findOne({ slug })
        if (!store) return res.status(404).send({ message: 'Store not found.' })
        const categories = await Category.find({ store: store._id }).populate('products')
        let products = await Product.find({ featured: true, store: store._id })
        // only return categories with products
        const filtered = categories.filter(category => category.products.length > 0)
        if (!products.length) products = await Product.find({ store: store._id }).limit(10)
        res.send({ store, categories: filtered, products })
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})


module.exports = router