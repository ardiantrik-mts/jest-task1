const response = require('../helpers/response')
const Item = require('../models/Item')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const assets_path = "assets/upload/item/"

const item_post = async (req, res) => {
    const { name, stock, description,
            expiredDate, carrotRate
    } = req.body
    // console.log(req.body)

    try {
        if(!req.files) {
            return response(res, 500, false, "No File Uploaded!")
        } 

        //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
        let item_img = req.files.image;
        
        //Use the mv() method to place the file in upload directory (i.e. "uploads")
        const imagePath = assets_path + Date.now() + '-' + item_img.name
        // console.log(image_path);
        item_img.mv(imagePath);
        

        const item = new Item({
            name: name,
            stock: stock,
            description: description,
            expiredDate: expiredDate,
            claimed : 0,
            carrotRate: carrotRate,
            status: 0,
            imagePath: imagePath,
            // staff_groups: [""]
        });

        const newItem = await item.save();
        return response(res, 200, true, 'Data Inserted')
    } catch (err) {
        return response(res, 500, false, err)
    }
}

const setStatusActive_update= async (req, res, next) => {
    // console.log(req.params)
    // console.log(req.body)
    try {
        const item_id = req.params._id
        const group_id = req.body

        const newGroup = await Item.findByIdAndUpdate(
            item_id,
            {  status: 1, $addToSet: { staffGroups: group_id.staffGroups} },
            { new: true, useFindAndModify: false },
        );
        // console.log(newGroup);
        return response(res, 200, true, 'Data Item Actived', newGroup)
    } catch (err) {
        return response(res, 500, false, err)
    }
}

const item_get = async (req, res) => {
    try {
        const items = await Item.find({})
        return response(res, 200, true, 'Data Found', items)
    } catch (err) {
        return response(res, 400, true, 'Data Not Found')
    }
}

const item_getID = async (req, res) => {
    try {
        // const items = await Item.find({ _id: new RegExp(req.params.name, 'i') })
        const items = await Item.findOne({ _id: req.params._id })
        return response(res, 200, true, 'Data Found', items)
    } catch (err) {
        return response(res, 400, false, 'Data Not Found', err)
    }
}

const item_update = async (req, res) => {
    // console.log(req.body);
    try {
        const filter = req.params;
        var update = req.body;

        if(req.files) {

            const items = await Item.findOne({ _id: filter })
            const prevImage_path = items.imagePath
            //Use the name of the input field to retrieve the uploaded file
            let item_img = req.files.image;
            
            //Use the mv() method to place the file in upload directory
            const imagePath = assets_path + Date.now() + '-' + item_img.name
            item_img.mv(imagePath);
            
            fs.unlink(prevImage_path, (err) => {
                if (err) {
                    return response(res, 500, false, 'Unable to remove image',err)
                }     
                //file removed
            })
            
            const item = await Item.findByIdAndUpdate(filter, { "imagePath" :imagePath }, {
                new: true,
                upsert: true 
            });

        }

        const item = await Item.findByIdAndUpdate(filter, update, {
            new: true,
            upsert: true 
        });

        

        return response(res, 200, true, 'Data Updated')
    } catch (err) {
        return response(res, 500, false, err)
    }
}

const setStatusInactive_update = async (req, res) => {
    // console.log(req.body);
    try {
        const filter = req.params;
        const update = {
            "status" : 0,
            $unset: { "staffGroups" : "" }
        };
        
        const item = await Item.findByIdAndUpdate(filter, update, {
            new: true,
            upsert: true 
        });

        return response(res, 200, true, 'Data Item Inactived')
    } catch (err) {
        return response(res, 500, false, err)
    }
}

const item_delete = async (req, res) => {
    // console.log(req.params);
    const filter = req.params;
    try {
        const items = await Item.findOne({ _id: filter })
        const prevImage_path = items.imagePath

        fs.unlink(prevImage_path, (err) => {
            if (err) {
                return response(res, 500, false, "Unable to remove image",err)
            }     
            //file removed
        })
        
        const item = await Item.findByIdAndRemove(req.params._id);
        return response(res, 200, true, 'Data Deleted')
    }catch(err) {
        return response(res, 500, false, err)
    }
}

module.exports = {
    item_get,
    item_getID,
    item_post,
    item_update,
    item_delete,
    setStatusActive_update,
    setStatusInactive_update
}