const Appointment = require("../models/Appointment")
const response = require("../utils/response")
const catchAsync  = require("../utils/catchAsync")


exports.createAppointment = catchAsync(async (req, res, next) => {
    const appointment = await Appointment.create(req.body);
    response(res, appointment, 200, "appointment created successfully")
});

exports.getAppointments = catchAsync(async(req, res, next) => {
    const appointments = await Appointment.find()
    if(!getAppointments){return next(new appError("could not get appointment documents", 404))}  
    response(res,appointments, 200, "retrieved appointments successfully")
    })
exports.getAppointment = catchAsync(async (req, res, next) => {
    const appointment = await Appointment.findById(req.params.id).populate('appointments');
    if(!getAppointment) return next(new appError("Could not find an appointment document", 404))

    response(res, appointment, 200, 'Retrieved appointment successfully')
});

exports.updateAppointment = catchAsync(async (req, res, next) =>{
        const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body)
        if(!(updatedAppointment)){return next(new appError("Could not find an appointment to update", 404))}
        response(res, updatedAppointment, 202, "Updated appointment successfully.")
})

exports.deleteAppointment = catchAsync(async(req, res, next) =>{
        const appointment = await Appointment.findByIdAndDelete(req.params.id)
        if(!appointment){ return next(new appError("Cold not find appointment to delete", 404))}
        response(res, appointment, 204, "Deleted appointment successfully." )
        r
})