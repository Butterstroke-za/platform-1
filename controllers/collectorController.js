const Collector = require("../models/Collector")

exports.createCollector = async (req, res, next)=>{
    try{
        const collector = await Collector.create(req.body)

        res.status(200).json({
            status: 'success', 
            message: 'collector created successfully', 
            data: collector
        })
    }catch(err){
        res.status(500).json({
            status: 'error', 
            message: 'could not create collector document', 
            error: err
        })
    }
}

exports.getCollector = (req, res, next)=>{

}


exports.getCollectors = async (req, res, next)=>{
    try{
        const collectors = await Collector.find()

        res.status(200).json({
            status: 'success', 
            message: 'collectors retrieved successfully', 
            results: collectors.length, 
            data: collectors
        })
    }catch(err){
        res.status(404).json({
            status: 'error', 
            message: 'could not get collector documents', 
            error: err
        })
    }
}

exports.updateCollector = async (req, res, next)=>{
    try{
        const collector = await Collector.findByIdAndUpdate(req.params.id, req.body, {new: true})

        res.status(200).json({
            status: 'success', 
            message: 'collector document updated successfully', 
            data: collector
        })
    }catch(err){
        res.status(400).json({
            status: 'error', 
            message: 'could not get collector documents', 
            error: err
        })
    }
}

exports.deleteCollector = async (req, res, next)=>{
    try{
        const collector = await Collector.findByIdAndDelete(req.params.id)

        res.status(204).json({
            status: 'success', 
            message: 'collector deleted successfully', 
            data: collector
        })
    }catch(err){
        res.status(404).json({
            status: 'error', 
            message: 'could not delete collector document', 
            error: err
        })
    }
}