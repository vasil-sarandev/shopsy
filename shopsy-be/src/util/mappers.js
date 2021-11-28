var fs = require('fs')
const { isEmpty } = require('lodash')
const { uploadFileToS3 } = require('../lib/aws/s3')
const { v4: uuidv4 } = require('uuid')
const multiparty = require('multiparty')

const default_shop_logo_url = 'https://shopsy.s3.eu-central-1.amazonaws.com/assets/default_logo_shops.png'


const defaultDeliveryTypesValues = {
    speedy: { active: true, price: 3.49 },
    econt: { active: true, price: 5.99 },
    address: { active: true, price: 6.99 },
    pickup: { active: false, price: 0.0 }
}


const parseStoreData = async (req) => new Promise((resolve, reject) => {
    var form = new multiparty.Form()
    form.parse(req, async (err, fields, files) => {
        if (err) {
            reject(err)
        }
        const { logo } = files
        const { name, slug, theme, logo: logoField, enableOrders, announcement, deliveryTypes } = fields

        let logoURL

        if (!isEmpty(logo)) {
            const logoBuffer = fs.readFileSync(logo[0].path)
            logoURL = await uploadFileToS3(logoBuffer, `logos/${uuidv4()}.png`)
        } else if (!isEmpty(logoField)) {
            logoURL = logoField[0]
        } else {
            logoURL = default_shop_logo_url
        }


        const store = {
            name: name[0],
            slug: slug[0],
            theme: JSON.parse(theme[0]),
            enableOrders: JSON.parse(enableOrders[0]),
            logo: logoURL,
            owner: req.user.sub
        }
        if (!isEmpty(announcement)) store.announcement = announcement[0]
        else store.announcement = ''
        if (!isEmpty(deliveryTypes)) store.deliveryTypes = JSON.parse(deliveryTypes[0])
        else store.deliveryTypes = defaultDeliveryTypesValues

        resolve(store)

    })
})

const parseCategoryData = async (req) => new Promise((resolve, reject) => {
    const { storeId } = req
    var form = new multiparty.Form()
    form.parse(req, async (err, fields, files) => {
        if (err) {
            reject(err)
        }
        const { image } = files
        const { title, image: imageField } = fields

        let imageURL
        if (!isEmpty(image)) {
            const imageBuffer = fs.readFileSync(image[0].path)
            const id = uuidv4()
            imageURL = await uploadFileToS3(imageBuffer, `categories/${storeId}_${id}.png`)
        } else {
            // this is when it's an update. we're just passing the url.
            if (!isEmpty(imageField) && imageField[0] !== '[]') {
                imageURL = imageField[0]
            }
        }

        const category = {
            title: title[0],
            image: imageURL,
            store: storeId
        }

        resolve(category)
    })
})

const parseProductData = async (req) => new Promise((resolve, reject) => {
    const { storeId } = req
    var form = new multiparty.Form()
    form.parse(req, async (err, fields, files) => {
        if (err) {
            reject(err)
        }
        try {

            const { images: imageFiles } = files
            const { name, price, quantity, category, description, images: imageFields, featured } = fields


            const imageURLS = []

            //existing images first.
            if (imageFields) {
                for (let image of imageFields) {
                    imageURLS.push(image)
                }
            }

            if (imageFiles) {
                // eslint-disable-next-line no-unused-vars
                for (let [index, image] of imageFiles.entries()) {
                    const imageBuffer = fs.readFileSync(image.path)
                    const id = uuidv4()
                    const imageURL = await uploadFileToS3(imageBuffer, `products/${storeId}_${id}.png`)
                    imageURLS.push(imageURL)
                }
            }


            const product = {
                name: name[0],
                price: parseFloat(price[0]),
                category: category[0],
                quantity: quantity[0],
                images: imageURLS,
                featured: JSON.parse(featured),
                store: storeId,
            }

            if (!isEmpty(description)) product.description = description[0]

            resolve(product)
        } catch (e) {
            console.log('error!', e)
            reject(e)
        }
    })
})


module.exports = { parseStoreData, parseCategoryData, parseProductData }