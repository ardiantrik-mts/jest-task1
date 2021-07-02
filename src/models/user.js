const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    jobFamily: {
        type: String
    },
    grade: {
        type: String
    },
    dateOfBirth: {
        type: Date
    },
    roleId: {
        type: Number,
        required: true
    },
    office: {
        type: String
    },
    groups:[
        {
            type: Schema.Types.ObjectId,
            ref: "Group"
        }
    ]
}, {timestamps: true})

const User = mongoose.model("users", userSchema)
module.exports = User

