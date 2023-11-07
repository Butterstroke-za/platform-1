const mongoose = require('mongoose')
const validator = require('validator')
const argon = require('argon2')


const userSchema = new mongoose.Schema({
    idNumber:{
        type: Number, 
        required: [true, 'Your ID number is required.'], 
        trim: true, 
        unique: true
    },
    password: {
        type: String, 
        required: [true, 'Your password is required.'],
    }, 
    confirmPassword: {
        type: String, 
        required:[true, 'Confirm Password is required.'],
        validate: {
            validator: function(value){
                return value === this.password
            }, 
            message: "Password and Confirm Password do not match."
        }
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
        }, 
        salt: String
})

userSchema.virtual('appointments', {
    ref: 'Appointment', 
    foreignField: 'user',
    localField: 'data._id'
})

userSchema.pre('save', function(next){
    if(!this.password.isModified) return next()

    try{
        const salt = crypto.randomBytes(16).toString('hex')
        this.password = argon.hash(this.password, salt, {
             type: argon2.argon2id,
            memoryCost: 2 ** 17,
            timeCost: 3,
            parallelism: 1
        })

        this.salt = salt
        next()

    }catch(err){
        next(err)
    }
})

userSchema.methods.checkPassword = function(hashedPass, userPassword, userSalt){
    return argon.verify(hashedPass, userPassword, userSalt)
}

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