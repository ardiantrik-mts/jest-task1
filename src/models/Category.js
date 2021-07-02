const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = mongoose.model(
    "Category",
    new mongoose.Schema({
    namecategory: {
        type: String, 
        required:true
    },
    description: {
        type: String,
        require: true
    },
    product: [{
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    }]
    }, { timestamps: true})
)

module.exports = categorySchema
