const Application = require('../models/Application')
const catchAsync = require('../utils/catchAsync')
const response = require('../utils/response')

exports.getAllApplications = catchAsync(async(req, res, next)=>{
    const application = await Application.find()
    response(res, application, 200, 'Retrieved applications successfully. ')
})

exports.createApplication = catchAsync(async(req, res, next)=>{
    const application = await Application.create(req.body)
    response(res, application, 201, 'Application created successfully.')
})

exports.getApplication = catchAsync(async(req, res, next)=>{
    const application = await Application.findById(req.params.id).populate('user')
    response(res, application, 200, 'Retrieved application successfully. ')
})

exports.deleteApplication = catchAsync(async(req, res, next)=>{
    const application = await Application.delete(req.params.id)
    response(res, application, 204, 'Application deleted sucessfully.')
})
exports.updateApplication =catchAsync(async(req, res, next)=>{
    const application = await Application.findByIdAndUpdate(req.params.id, req.body)
    response(res, application, 201, 'Application updated successfully. ')
})