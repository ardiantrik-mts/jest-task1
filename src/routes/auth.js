const express = require('express')
const router = express.Router();
const authControllers = require('../controllers/auth')
const userValidator = require ('../middlewares/auth')

router.post('/register',  userValidator.isFieldsEmpty, userValidator.isFieldsLength, userValidator.isFieldsLegalChars, authControllers.register)
router.post('/login', authControllers.login)

module.exports = router;