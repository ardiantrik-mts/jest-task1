const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    carrotAmount: {
        type: Number
    },
    transactionNote: {
        type: String
    },
    transactionType: {
        type: String,
    },
    flag: {
        type: Number,
        required: true
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "items"
    }
}, {
    timestamps: true
})

const Transaction = mongoose.model("transactions", transactionSchema)
module.exports = Transaction