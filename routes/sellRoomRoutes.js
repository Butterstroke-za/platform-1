const express = require('express')
const sellRoomController = require('../controllers/sellRoomControllers.js')
const authController = require('../controllers/authController.js')

const router = express.Router()

router.route('/').post(sellRoomController.createSellRoom).get(sellRoomController.getSellRooms)

router.route('/:id').get(sellRoomController.getSellRoom).patch(sellRoomController.updateSellRoom).delete(sellRoomController.deleteSellRoom).put(authController.protect, sellRoomController.sellRoomApplication)


module.exports = router