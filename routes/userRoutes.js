const express = require('express')
const { route } = require('../app.js')
const userController = require('../controllers/userController.js')

const router = express.Router()


router.route('/:id').get(userController.getUser).delete(userController.deactivateUser)

router.route('/').get(userController.getUsers).post(userController.createUser)



module.exports = router