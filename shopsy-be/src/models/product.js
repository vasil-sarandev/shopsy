const validator = require('validator')
const mongoose = require('mongoose')




const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        images: [
            {
                type: String,
                trim: true,
                validate: (val) => {
                    const valid = validator.isURL(val)
                    if (!valid) {
                        throw new Error('Image must be a url.')
                    }
                }
            }
        ],
        description: {
            type: String,
            trim: true,
            default: ''
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: String,
            trim: true,
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Category'
        },
        store: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Store'
        },
        featured: {
            type: Boolean,
            required: true
        }
    },
    { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product