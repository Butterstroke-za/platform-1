const mongoose = require('mongoose')
const validator = require('validator')


const collectorSchema = mongoose.Schema({
    fullName: {
        type: String, 
        required: [true, 'Your full name is required.'], 
        trim: true, 
        validate: [validator.isAlpha, 'Your full name can only contain alphabets.']
    }, 
    contactNumber: {
        type: Number, 
        required: [true, 'You contact number is required.'], 
        trim: true, 
        validate: {
            validator: function(value){
                return value.length < 10
            }, 
            message: 'Please provide a valid phone number associated with South African service providers.'
        }
    }, 
    operatingArea: String, 
    qualifications: [String], 
    appointments: { //come back to  this
        type: mongoose.Types.ObjectId, 
        ref: 'Appointment'
    }

})

const Collector = mongoose.Model('Collector', collectorSchema)

module.exports = Collector