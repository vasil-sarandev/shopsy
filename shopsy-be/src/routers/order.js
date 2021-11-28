const { ObjectId } = require('bson')
const express = require('express')
const { isEmpty } = require('lodash')
const { sendMailToUserId } = require('../lib/email/sendEmail')
const auth = require('../lib/middleware/auth')
const storeId = require('../lib/middleware/store')
const Order = require('../models/order')
const Store = require('../models/store')

const router = new express.Router()

router.post('/', async (req, res) => {
    try {
        const { slug } = req.body
        const store = await Store.findOne({ slug: slug })
        delete req.body.slug
        const order = new Order({
            ...req.body,
            store: store.id
        })
        await order.save()
        sendMailToUserId(store.owner)
        // sending store id for emit to socket io.
        res.send(store.id)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})


router.post('/pagination', auth, storeId, async (req, res) => {
    const { storeId } = req
    const { pagination: { next, limit, count } } = req.body
    try {
        const filter = { store: storeId }
        if (next) filter._id = { '$lt': ObjectId(next) }
        const orders = await Order.find(filter).limit(limit).sort({ _id: -1 })

        if (isEmpty(orders)) return res.status(200).send({ data: [] })

        const countFilter = { store: storeId }
        const pagination = {
            count: count ? await Order.countDocuments(countFilter) : undefined,
            next: orders[orders.length - 1]._id,
            limit: limit
        }
        res.send({ data: orders, paging: pagination })
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.put('/:id/complete', auth, storeId, async (req, res) => {
    const { id } = req.params
    const { storeId } = req
    try {
        const order = await Order.findOne({ _id: id, store: storeId })
        if (!order) return res.status(404).send({ message: 'Order not found.' })
        order.complete = true
        await order.save()
        res.send(order)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.get('/:id', auth, storeId, async (req, res) => {
    const { id } = req.params
    const { storeId } = req
    try {
        const order = await Order.findOne({ _id: id, store: storeId })
        if (!order) return res.status(404).send({ message: 'Order not found.' })
        res.send(order)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

module.exports = router