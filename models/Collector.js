const mongoose = require('mongoose')
const validator = require('validator')


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

    // appointments: [              this is not needed. The appointment documents being referenced to the collector can be displayed through virtual populate
    //     {
    //         type: mongoose.Types.ObjectId, 
    //         ref: 'Appointment'
    //     }
    // ]

})

const Collector = mongoose.model('Collector', collectorSchema)

module.exports = Collector