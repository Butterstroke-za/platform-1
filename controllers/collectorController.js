const Collector = require("../models/Collector")
const appError = require('../utils/appError')
const response = require('../utils/response')
const catchAsync = require("../utils/catchAsync")

exports.createCollector = catchAsync(async (req, res, next) => {
    const collectors = await Collector.find()
    if (!collectors) {
        return next(new appError("There was no Collector found", 404))
    }
    response(res, collectors, 200, "Collectors retrieved successfully")

})

exports.getCollector = catchAsync(async (req, res, next) => {

    const collector = await Collector.findById(req.params.id).populate('appointments').populate('sellRoom')
    //loop through appointments array and populate indv.
    // might need to loop through to populate sell room and user

    if (!collector) 
    return next(new appError("There was no Collector found", 404))
    response(res, collector, 200, "retrieved collector document successfully")

})


exports.getCollectors = catchAsync(async (req, res, next) => {
        const collectors = await Collector.find()
        if (!this.getCollectors) 
        return next(new appError("could not get collector documents", 404))
        response(res, collectors, 200, "collectors retrieved successfully")
        })


exports.updateCollector = catchAsync(async (req, res, next) => {
        const collector = await Collector.findByIdAndUpdate(req.params.id, req.body, {})
        if (!this.updateCollectors) return next(new appError("could not get collector documents", 404))
        response(res, collector, 200, "collector document updated successfully")
        });


exports.deleteCollector = catchAsync(async (req, res, next) => {
        const collector = await Collector.findByIdAndDelete(req.params.id)
        if (!this.deleteCollectors) return next(new appError("could not delete collector document", 404))
        response(res, collector, 200, "collector deleted successfully")
        });
