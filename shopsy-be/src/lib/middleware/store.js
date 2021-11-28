const Store = require('../../models/store')

const storeId = async (req, res, next) => {
    try {
        const user_id = req.user.sub
        const store = await Store.findOne({ owner: user_id })
        req.storeId = store._id
        next()
    } catch (e) {
        res.status(401).send({ message: 'Unauthorized.' })
    }
}

module.exports = storeId