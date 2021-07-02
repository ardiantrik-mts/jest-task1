const express = require('express')
const router = express.Router();
const stafGroupController = require('../controllers/staffGroup')


router.post('/staffgroup', stafGroupController.group_post)
router.get('/staffgroup', stafGroupController.group_get)
router.get('/staffgroup/:id', stafGroupController.group_getId)
router.delete('/staffgroup/:id', stafGroupController.group_delete)
router.patch('/staffgroup/:id', stafGroupController.group_patch)


// Add new member to Group 
router.post('/staffgroup/add/:groupId', stafGroupController.addmember_post)
router.put('/staffgroup/delete/:groupId/:userId',stafGroupController.deleteUserFromGroup)
// Delete Member from group


module.exports = router