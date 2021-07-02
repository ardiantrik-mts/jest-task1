const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const walletSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    earned: {
        type: Number,
        default: 0,
        required: true,
    },
    shared: {
        type: Number,
        required: true,
        default: 0
    },
    bazaar: {
        type: Number,
        required: true,
        default: 0
    },
    balance: {
        type: Number,
        required:true,
        default: 0
    }
}, {timestamps: true})

const Wallets = mongoose.model("Wallets", walletSchema)
module.exports = Wallets
