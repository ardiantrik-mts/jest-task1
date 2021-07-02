const express = require('express')
const router = express.Router()
const paramController = require('../controllers/parameterController')
const userValidator = require('../middlewares/auth')

router.post('/param', paramController.param_post)
router.get('/param', paramController.param_get)
router.patch('/param/:_id', paramController.param_update)
module.exports = router