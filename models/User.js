const mongoose = require('mongoose')
const { response } = require('../app')
const validator = require('validator')

const userSchema = new mongoose.Schema({
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
    email: {
        type: String, 
        unique: true, 
        lowercase: true,  
        trim: true, 
        validate: [validator.isEmail, 'Please use a valid email address.']
        
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
            default: 'No response'
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