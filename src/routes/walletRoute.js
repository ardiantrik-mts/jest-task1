const express = require('express')
const router = express.Router();
const walletController = require('../controllers/wallet')
const userValidator = require('../middlewares/auth')

router.get('/wallet/getAll', userValidator.authCheck, walletController.getWalletAll)
router.get('/wallet/getByUser/:id',userValidator.authCheck, walletController.getWalletById)
router.patch('/wallet/update/',userValidator.authCheck, walletController.updateWallet)

module.exports = router;