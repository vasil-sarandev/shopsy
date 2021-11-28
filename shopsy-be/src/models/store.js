const validator = require('validator')
const mongoose = require('mongoose')
const Category = require('./category')

const DeliveryType = {
    active: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}

const DeliveryTypes = {
    speedy: DeliveryType,
    econt: DeliveryType,
    address: DeliveryType,
    pickup: DeliveryType
}

const storeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        owner: {
            type: String,
            trim: true,
            required: true,
            //1 store per user.
            unique: true
        },
        slug: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            validate: (val) => {
                const valid = validator.isSlug(val)
                if (!valid) {
                    throw new Error('Not a valid slug (url).')
                }
            }
        },
        logo: {
            type: String,
            required: true,
            validate: (val) => {
                const valid = validator.isURL(val)
                if (!valid) {
                    throw new Error('Image must be a url.')
                }
            },
        },
        announcement: {
            type: String,
            trim: true
        },
        enableOrders: {
            type: Boolean,
            required: true,
            default: true
        },
        deliveryTypes: DeliveryTypes,
        theme: {
            primary: {
                type: String,
                required: true,
                default: '#ff8000',
                validate: (val) => {
                    const valid = validator.isHexColor(val)
                    if (!valid) {
                        throw new Error('Theme colors must be in HEX format.')
                    }
                }
            },
            secondary: {
                type: String,
                required: true,
                default: '#ff6a5d',
                validate: (val) => {
                    const valid = validator.isHexColor(val)
                    if (!valid) {
                        throw new Error('Theme colors must be in HEX format.')
                    }
                }
            }
        }
    },
    { timestamps: true }
)

storeSchema.pre('remove', async function (next) {
    const store = this
    await Category.deleteMany({ store: store._id })
    next()
})

storeSchema.virtual('categories', {
    ref: 'Category',
    localField: '_id',
    foreignField: 'store'
})

storeSchema.methods.toJSON = function () {
    const store = this.toObject({ virtuals: true })
    if (!store.categories) store.categories = []
    delete store.owner
    return store
}

const Store = mongoose.model('Store', storeSchema)

module.exports = Store