const express = require('express')
const sellRoomController = require('../controllers/sellRoomControllers')
const authController = require('../controllers/authController')
const applicationRouter = require('./applicationRoutes')

const router = express.Router()

router.route('/').post(sellRoomController.createSellRoom).get(sellRoomController.getSellRooms)

router.route('/:id').get(sellRoomController.getSellRoom).patch(sellRoomController.updateSellRoom).delete(sellRoomController.deleteSellRoom)

router.use('/:roomId/applications', applicationRouter)

// put(authController.protect, sellRoomController.sellRoomApplication)



module.exports = router