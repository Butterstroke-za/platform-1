const SellRoom = require("../models/SellRoom.js")
const catchAsync = require('../utils/catchAsync.js')
const response = require('../utils/response.js')

exports.createSellRoom = catchAsync(async(req, res, next)=>{
        const sellRoom  = await  SellRoom.create(req.body)
        if(!sellRoom) return next(new appError("Could not find a sell room", 404))
       response(res, sellRoom, 200, "Sell room created successfully")
})

exports.getSellRooms = catchAsync(async (req, res, next) =>{
        const sellRooms = await SellRoom.find()
        if(!sellRooms) return next(new appError('Could not find sell rooms', 404))
        response(res, sellRooms, 200, "Sell rooms found successfully")
})

exports.getSellRoom = catchAsync(async (req, res ,next)=>{
        const sellRoom = await SellRoom.findById(req.params.id).populate('applicants')
        if(!sellRoom){ return next(new appError("Could not find any sell room", 404))}
        response(res, sellRoom, 200, "Sell room retrieved successfully.")
})

exports.updateSellRoom = catchAsync(async (req, res, next) =>{
        const updatedSellRoom = await SellRoom.findByIdAndUpdate(req.params.id, req.body)
        if(!updatedSellRoom){return next( new appError("Could not find a sell room to update", 404))}
       response(res, updatedSellRoom, 204, "Updated sell room successfully.")
})

exports.deleteSellRoom = catchAsync(async(req, res, next) =>{
        const sellRoom = await SellRoom.findByIdAndDelete(req.params.id)
        if(!sellRoom){ return next(new appError("Could not find sell room to delete."))}
        response(res, sellRoom, 204, "Sell room deleted successfully.")
})

exports.sellRoomApplication = catchAsync(async (req, res , next) =>{
        console.log('apply for sell room')
        const sellRoom = await SellRoom.findOne({id: req.params.id})
        sellRoom.applicants.push(req.user._id)
        sellRoom.save({validateBeforeSave: false})
        
        // console.log(req.user)
        response(res, sellRoom, 200, "Application for sell room succeeded.")
        
})