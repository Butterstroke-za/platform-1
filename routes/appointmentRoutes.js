const express = require('express')
const appointmentController = require('../controllers/appointmentController.js')

const router = express.Router()

router.route('/').post(appointmentController.createAppointment).get(appointmentController.getAppointments)

router.route('/:id').get(appointmentController.getAppointment).patch(appointmentController.updateAppointment).delete(appointmentController.deleteAppointment)


module.exports = router