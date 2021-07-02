const express = require('express')
const router = express.Router();
const transactionControllers = require('../controllers/transaction')
const userValidator = require('../middlewares/auth')

// comment this section if you want to run unit test
router.post('/transaction', userValidator.authCheck, transactionControllers.transactionUserToUser)
router.get('/transaction', userValidator.authCheck, transactionControllers.getUserHistory)
router.post('/transaction/exchange/:item_id', userValidator.authCheck, transactionControllers.transactionExchangeBazaar)
router.get('/transaction/bazaar/', userValidator.authCheck, transactionControllers.getUserHistoryBazaar)
router.get('/transaction/bazaarClaimed', userValidator.authCheck, transactionControllers.getBazaarClaimed)
// comment until this section


// uncomment this section if you want to run unit test
// router.post('/transaction', transactionControllers.transactionUserToUser)
// router.get('/transaction', transactionControllers.getUserHistory)
// uncomment until this section

module.exports = router;