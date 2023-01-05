const mongoose = require('mongoose')
const validator = require('validator')
const Appointment = require('./Appointment')


const collectorSchema = mongoose.Schema({
    fullName: {
        type: String, 
        required: [true, 'Your full name is required.'], 
        trim: true
    }, 
    contactNumber: {
        type: Number, 
        required: [true, 'You contact number is required.'], 
        trim: true
    }, 
    operatingArea: String, 
    qualifications: [String], 
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}) 

collectorSchema.virtual('appointments', {
    ref: 'Appointment', 
    localField: '_id', 
    foreignField: 'appointmentDetails.collector'
})

collectorSchema.virtual('user', {
    ref: 'Appointment', 
    localField: 'appointments.user',
    foreignField: 'user'
})

collectorSchema.virtual('sellRoom', {
    ref: 'Appointment', 
    localField: 'appointments.sellRoom', 
    foreignField: '_id'
})

collectorSchema.pre(/^find/, function(next){
	this.populate({path: 'sellRoom' })
    next()
})
const Collector = mongoose.model('Collector', collectorSchema)

module.exports = Collector