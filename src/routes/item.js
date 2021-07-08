const express = require('express')
const router = express.Router()
const itemController = require('../controllers/itemController')
const userValidator = require('../middlewares/auth')

router.post('/item', itemController.item_post)
router.get('/item', itemController.item_get)
// router.get('/item', userValidator.authCheck, itemController.item_get)
router.get('/item/:_id', itemController.item_getID)
router.patch('/item/:_id', itemController.item_update)
router.patch('/item/setActive/:_id', itemController.setStatusActive_update)
router.patch('/item/setInactive/:_id', itemController.setStatusInactive_update)
router.delete('/item/:_id', itemController.item_delete)

module.exports = router