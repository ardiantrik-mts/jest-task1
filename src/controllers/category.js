const Category = require('../models/Category')

module.exports.category_post= async (req, res) => {
    const category = new Category(req.body)
    console.log(category)
    try {
        await category.save()
        res.status(201).send(category)
    } catch (err) {
        res.status(400).send(err.message)
    }
}