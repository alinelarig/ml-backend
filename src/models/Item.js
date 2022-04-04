const mongoose = require('mongoose')

const Item = mongoose.model('Item', {
    id: String,
    title: String, 
    category: String,
    price: { 
        currency: String, 
        amount: Number, 
        decimals: Number, 
    }, 
    picture: String, 
    condition: String, 
    free_shipping: Boolean, 
    sold_quantity: Number,
    description: String
})

module.exports = Item