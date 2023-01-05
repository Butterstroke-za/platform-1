const SellRoom = require("../models/sellRoom")

exports.createSellRoom =  async(req, res, next)=>{
    try{
        const sellRoom  = await  SellRoom.create(req.body)
        res.status(200).json({
            status: 'success', 
            message: 'sellRoom created successfully', 
            data: sellRoom
        })
    }catch(err){
        res.status(400).json({
            status: 'error', 
            message: 'something went wrong', 
            error: err 
        })
    }
}

exports.getSellRooms = async (req, res, next) =>{
    try{
        const sellRooms = await SellRoom.find()

        res.status(200).json({
            status: 'success', 
            message: 'retrieved Sell Rooms successfully', 
            results: sellRooms.length, 
            data: sellRooms
        })
    }catch(err){
        res.status(400).json({
            status: 'error', 
            message: 'could not get Sell Room documents',
            error: err
        })
    }
}

exports.getSellRoom = async (req, res ,next)=>{
    try{
        const sellRoom = await SellRoom.findById(req.params.id)

        res.status(200).json({
            status: 'success', 
            message: 'Retrieved Sell Room successfully', 
            data: sellRoom
        })
    }catch(err){
        res.status(404).json({
            status: 'error', 
            message: 'Could not find Sell Room document', 
            error: err
        })
    }
}

exports.updateSellRoom = async (req, res, next) =>{
    console.log('update already existing sell Room here')

    try{
        const updatedsellRoom = await SellRoom.findByIdAndUpdate(req.params.id, req.body)
        
        res.status(200).json({
            status:  'success', 
            message:'sellRoom updated successfully', 
            data: updatedsellRoom
        })
    }catch(err){
        console.log(err)
    }
}

exports.deleteSellRoom = async(req, res, next) =>{
    try{
        const sellRoom = await SellRoom.findByIdAndDelete(req.params.id)

        res.status(204).json({
            status: 'success', 
            message: 'Sell Room deleted successfully', 
            data: sellRoom
        })
    }catch(err){
        res.status(404).json({
            status: 'error', 
            message:'Could not delete Sell Room', 
            error: err
        })
    }
}