const express = require('express')
const router = express.Router();
const userController = require('../controllers/user')
const userValidator = require('../middlewares/auth')

// comment this section if you want to run unit test
router.post('/users/create', userValidator.authCheck, userController.createUser)
router.get('/users/getAll', userValidator.authCheck, userController.getAllUser)
router.get('/users/getById/:id',userValidator.authCheck, userController.getUserById)
router.patch('/users/updateUser/:id',userValidator.authCheck, userController.updateUser)
router.get('/users/getAllWithCondition', userValidator.authCheck, userController.getAllUserWithCondition)
router.get('/users/birthday', userValidator.authCheck, userController.getUserBirthday)
router.post('/users/activateBirthdayScheduler', userValidator.authCheck, userController.activateBirthdayScheduler)
// comment until this section


// uncomment this section if you want to run unit test
// router.post('/users/create', userController.createUser)
// router.get('/users/getAll', userController.getAllUser)
// router.get('/users/getById/:id', userController.getUserById)
// router.patch('/users/updateUser/:id', userController.updateUser)
// router.get('/users/getAllWithCondition', userController.getAllUserWithCondition)
// router.get('/users/birthday', userController.getUserBirthday)
// router.post('/users/activateBirthdayScheduler', userController.activateBirthdayScheduler)
// uncomment until this section

module.exports = router