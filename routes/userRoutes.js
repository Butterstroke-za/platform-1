const express = require('express')
const { route } = require('../app.js')
const userController = require('../controllers/userController.js')
const authController = require('../controllers/authController')

const router = express.Router()

router.route('/').get(userController.getUsers).post(userController.createUser)
router.route('/:id').get(authController.protect, userController.getUser).delete(authController.protect, userController.deactivateUser).post(authController.login)


module.exports = router