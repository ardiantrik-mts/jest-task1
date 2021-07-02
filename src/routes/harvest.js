const express = require('express')
const router = express.Router()

const carrotController = require('../controllers/harverst')
const userValidator = require('../middlewares/auth')

router.post('/harvest', userValidator.authCheck, carrotController.create_harvest)
router.get('/harvest', userValidator.authCheck, carrotController.show_harvest)
router.patch('/harvest/add/:id', userValidator.authCheck, carrotController.addmore_harvest)
router.post('/harvest/transaction/:id', userValidator.authCheck, carrotController.transactionToUser)
router.get('/harvest/showtransaction', userValidator.authCheck, carrotController.showTransactionHarvest)
module.exports = router