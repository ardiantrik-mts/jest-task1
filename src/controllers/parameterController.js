const response = require('../helpers/response')
const Parameter = require('../models/Parameter')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const param_get = async (req, res) => {
    try {
        const parameter = await Parameter.find({})
        return response(res, 200, true, "Parameter Found", parameter)
    } catch (err) {
        return response(res, 400, false,"Parameter Not Found", err)
    }
}

const param_post = async (req, res) => {
    const { paramVariable, paramLimit } = req.body

    try {

        const parameter = new Parameter({
            paramVariable: paramVariable,
            paramLimit: paramLimit
        });

        const newParameter = await parameter.save();
        return response(res, 200, true, "Parameter Inserted")
    } catch (err) {
        return response(res, 500, true, err)
    }
}

const param_update = async (req, res) => {
    // console.log(req.body);
    try {
        const filter = req.params
        const update = req.body
        
        const parameter = await Parameter.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true 
        });

        return response(res, 200, true, "Parameter Updated")
    } catch (err) {
        return response(res, 500, true, err)
    }
}


module.exports = {
    param_get,
    param_post,
    param_update
}