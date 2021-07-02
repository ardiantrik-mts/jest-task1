const mongoose = require('mongoose')
const User = require('./user')

const groupSchema = mongoose.model(
    "Group", 
    new mongoose.Schema({
        groupname: {
            type: String,
            required : true,
            trim: true
        },
        carrot: {
            type: Number,
            required: true
        },
        note: {
            type: String,
            required: true
        },
        managername: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }]
    },{ timestamps: true })
)
// const Group = mongoose.model('group', groupSchema);
module.exports = groupSchema