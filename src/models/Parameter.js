const  mongoose  = require("mongoose");

//create schema
const paramSchema = new mongoose.Schema({
    paramVariable: {
        type: String,
        required: true,
    },
    paramLimit: {
        type: Number,
        required: true,
    }
}, { timestamps : true });

module.exports = new mongoose.model("parameters", paramSchema);
