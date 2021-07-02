const  mongoose  = require("mongoose");
const staffGroup = require("./staffGroup");

//create schema
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    expiredDate: {
        type: Date,
        required: true,
    },
    claimed: {
        type: Number,
    },
    carrotRate: {
        type: Number,
        required: true,
    },
    status: {
        // temporary : 1 = active, 0 = inactive
        type: Number
    },
    imagePath: {
        type: String,
        required: true,
    },
    staffGroups: [{
        // Waiting staff_group
        type: mongoose.Schema.Types.ObjectId,
        ref: staffGroup
    }]
}, { timestamps : true });

module.exports = new mongoose.model("items", itemSchema);