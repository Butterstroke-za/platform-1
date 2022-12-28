const express = require('express')
const sellRoomController = require('../controllers/appointmentController')

const router = express.Router()

router.route('/').post(sellRoomController.createSellRoom).get(sellRoomController.getSellRooms)

router.route('/:id').get(sellRoomController.getSellRoom).patch(sellRoomController.updateSellRoom).delete(sellRoomController.deleteSellRoom)


module.exports = router