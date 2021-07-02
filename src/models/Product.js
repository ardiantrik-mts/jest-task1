const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema ({
    productname: {
        type: String, 
        required:true
    },
    price: {
        type: Number, 
        required: true,
        min: 0
    },
    categories: [
        {
            type: String
        }
    ]
}, { timestamps: true})

module.exports = new mongoose.model('Product', productSchema)
const Test = mongoose.model('Product', productSchema)

/*
const productSchema = mongoose.model(
    "Product",
    new mongoose.Schema({
 name: {
        type: String, 
        required:true
    },
    price: {
        type: Number, 
        required: true,
        min: 0
    },
    categories: [
        {
            type: mongoose.Types.ObjectId, 
            ref: 'Category'
        }
    ]
    }, { timestamps: true})
)

module.export = productSchema
*/