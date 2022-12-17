const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String, 
        required: [true, 'Your full name is required.'], 
        trim: true
    }, 
    contactNumber: {
        type: Number, 
        required: [true, 'You contact number is required.'], 
    }, 
    email: {
        type: String, 
        unique: true, 
        trim: true
    }, 
    address: { //come back here as well
        type: String, 
        required: [true, 'Your address is required']
    }, 
    bestPractice: {
        type: Boolean, 
        default: False
    }, 
    offers: { //come back after some research
        description: String, 
        amount: Number, 
        expires: {
            type: Date, 
            default: Math.floor(Date.now() + 7 * (3600 * 1000 * 24))
        }, 
        status:{
            enum: ['Accepted', 'Rejected', 'No response'], 
            default: ['No response']
        }, 
        appointment:{
            type: mongoose.Types.ObjectId, 
            ref: 'Appointment'
        }, 
        supportingDocs: {type: String}, //come back to this after research
        verified: {
            type: Boolean, 
            default: False
        }
    }
})

const User =  mongoose.Model('User' , userSchema )

module.exports = User