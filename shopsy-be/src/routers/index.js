const express = require('express')
const storeRouter = require('./store')
const categoryRouter = require('./category')
const productRouter = require('./product')
const orderRouter = require('./order')
const blogRouter = require('./blog')
const superAdminRouter = require('./superAdmin')

const router = new express.Router()

router.use('/store', storeRouter)
router.use('/category', categoryRouter)
router.use('/product', productRouter)
router.use('/order', orderRouter)
router.use('/blog', blogRouter)
router.use('/superAdmin', superAdminRouter)

module.exports = router

