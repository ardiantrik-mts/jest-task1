const express = require('express')

const router = express.Router()

const productController = require('../controllers/product')


router.post('/products', productController.product_post)

// router.get('/products', productController.product_get)

// router.get('/product/:id', productController.product_getId)

module.exports = router