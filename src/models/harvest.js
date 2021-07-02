const mongoose = require('mongoose')
// const Schema = mongoose.Schema;

let today = new Date();
const harvestSchema = mongoose.model(
    "Harvest",
    new mongoose.Schema({
        year: {
            type: Number,
            default: 0,
            required: true,
        },
        harvest: {
            type: Number,
            required: true,
            default: 0
        },
        carrot_in_barn: {
            type: Number,
            required: true,
            default: 0
        },
        distributed_carrot: {
            type: Number,
            required:true,
            default: 0
        },
        expireAt: {
            type: Date,
            default: Date.now,
            
            index: { expires: '5m' },
        },
        status: {
            type: String,
            required: true,
            default: "active"
        }
    }, {timestamps: true})

)


module.exports = harvestSchema