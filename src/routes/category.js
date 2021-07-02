const express = require('express')

const router = express.Router()

const categoryController = require('../controllers/category')


router.post('/category', categoryController.category_post)
// router.get('/category', categoryController.category_get)

module.exports = router