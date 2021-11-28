const { ObjectId } = require('bson')
const express = require('express')
const { isEmpty } = require('lodash')
const auth = require('../lib/middleware/auth')
const storeId = require('../lib/middleware/store')
const Category = require('../models/category')
const Store = require('../models/store')
const { parseCategoryData } = require('../util/mappers')

const router = new express.Router()

router.post('/', auth, storeId, async (req, res) => {
    const categoryObj = await parseCategoryData(req)
    const category = new Category(categoryObj)
    try {
        await category.save()
        res.send(category)
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
})

router.post('/pagination', auth, storeId, async (req, res) => {
    const { storeId } = req
    const { filter: titleFilter, pagination: { next, limit, count } } = req.body
    try {
        const filter = { store: storeId }
        if (titleFilter) filter.title = { $regex: titleFilter, $options: 'i' }
        if (next) filter._id = { '$gt': ObjectId(next) }
        const categories = await Category.find(filter).limit(limit).populate('products')

        if (isEmpty(categories)) return res.status(200).send({ data: [] })

        const countFilter = { store: storeId }
        if (titleFilter) countFilter.title = { $regex: titleFilter, $options: 'i' }
        const pagination = {
            count: count ? await Category.countDocuments(countFilter) : undefined,
            next: categories[categories.length - 1].id,
            limit: limit
        }
        res.send({ data: categories, paging: pagination })
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.get('/:id', auth, async (req, res) => {
    const { id } = req.params
    try {
        const category = await Category.findOne({ _id: id })
        if (!category) return res.status(404).send({ message: 'Category not found.' })
        res.send(category)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.patch('/:id', auth, storeId, async (req, res) => {
    const { id } = req.params
    const updates = await parseCategoryData(req)
    try {
        const category = await Category.findOne({ _id: id, store: updates.store })
        if (!category) return res.status(404).send({ message: 'Category not found' })
        Object.keys(updates).forEach(update => category[update] = updates[update])
        await category.save()
        res.send(category)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.delete('/:id', auth, storeId, async (req, res) => {
    const { id } = req.params
    const { storeId } = req
    try {
        const category = await Category.findOne({ _id: id, store: storeId })
        if (!category) return res.status(404).send({ message: 'Category not found.' })
        await category.remove()
        res.status(200).send()
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.get('/categoryPage/:id', async (req, res) => {
    const { id } = req.params
    try {
        const category = await Category.findOne({ _id: id }).populate('products')
        const store = await Store.findOne({ _id: category.store })
        if (!category || !store) return res.status(404).send({ message: 'Category not found.' })
        res.send({ category, store })
    } catch (e) {
        console.log('error', e)
        res.status(500).send({ message: e.message })
    }
})

module.exports = router