const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    idNumber:{
        type: Number, 
        required: [true, 'Your ID number is required.'], 
        trim: true, 
        unique: true
    },
    fullName: {
        type: String, 
        required: [true, 'Your full name is required.'], 
        trim: true
    }, 
    contactNumber: {
        type: String, 
        required: [true, 'You contact number is required.'], 
        trim: true, 
        match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/
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
        required: [true, 'Your address is required'], 
        unique: true
    }, 
    bestPractice: {
        type: Boolean, 
        default: 'false'
    }, 
        supportingDocs: [String], //come back to this after research
        verified: {
            type: Boolean, 
            default: 'false'
        }, 
        role:{
            type: String, 
            enum: ['user'],
            default: 'user'
        }
    
})

userSchema.virtual('appointments', {
    ref: 'Appointment', 
    foreignField: 'user',
    localField: 'data._id'
})

const User =  mongoose.model('User' , userSchema )

module.exports = User


// offers: [{                                //come back after some research --- not needed, will populate data & offers potentially needs separate model file
    //     description: String, 
    //     amount: Number, 
    //     expires: {
    //         type: Date, 
    //         default: Math.floor(Date.now() + 7 * (3600 * 1000 * 24))
    //     }, 
        // status:{
        //     type: String,
        //     enum: ['Accepted', 'Rejected', 'No response'], 
        //     default: 'No response'
        // }, 
        // appointment:{
        //     type: mongoose.Types.ObjectId, 
        //     ref: 'Appointment'
        // }}], 