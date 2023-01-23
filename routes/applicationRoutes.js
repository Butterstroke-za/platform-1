const express = require('express')
const applicationController = require('../controllers/applicationController.js')

const router = express.Router({mergeParams: true})

router.route('/').get(applicationController.getAllApplications).post(applicationController.createApplication)

router.route('/:id').get(applicationController.getApplication).delete(applicationController.deleteApplication).patch(applicationController.updateApplication)

module.exports = router