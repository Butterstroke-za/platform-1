const Appointment = require("../models/Appointment")

exports.createAppointment =  async(req, res, next)=>{
    try{
        const appointment = await  Appointment.create(req.body)
        res.status(200).json({
            status: 'success', 
            message: 'appointment created successfully', 
            data: appointment
        })
    }catch(err){
        res.status(400).json({
            status: 'error', 
            message: 'could not create new document', 
            error: err.message
        })
    }
}

exports.getAppointments = async (req, res, next) =>{
    try{
        const appointments = await Appointment.find()
        res.status(200).json({
            status: 'success', 
            message: 'retrieved appointments successfully', 
            results: appointments.length, 
            data: appointments
        })
    }catch(err){
        res.status(400).json({
            status: 'error', 
            message: 'could not get appointment documents',
            error: err
        })
    }
}

exports.getAppointment = async (req, res ,next)=>{
    try{
        const appointment = await Appointment.findById(req.params.id).populate("appointmentDetails.collector").populate('sellRoom').populate('user')

        res.status(200).json({
            status: 'success', 
            message: 'Retrieved appointment successfully', 
            data: appointment
        })
    }catch(err){
        res.status(404).json({
            status: 'error', 
            message: 'Could not find an appointment document', 
            error: err
        })
    }
}

exports.updateAppointment = async (req, res, next) =>{
    try{
        const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body)
        
        res.status(200).json({
            status:  'success', 
            message:'appointment updated successfully', 
            data: updatedAppointment
        })
    }catch(err){
        res.status(404).json({
            status: 'fail', 
            message: 'could not update document', 
            error: err.message
        })
    }
}

exports.deleteAppointment = async(req, res, next) =>{
    try{
        const appointment = await Appointment.findByIdAndDelete(req.params.id)

        res.status(204).json({
            status: 'success', 
            message: 'Appointment deleted successfully', 
            data: appointment
        })
    }catch(err){
        res.status(404).json({
            status: 'error', 
            message:'Could not delete appointment', 
            error: err
        })
    }
}