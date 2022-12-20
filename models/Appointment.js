const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    sellRoom: {
        type: String, 
        required: [true, 'Offer Location is required'], 
        trim: true
    },
    User:{
        type: mongoose.Types.ObjectId, 
        ref: 'User'
    },
    appointmentDetails:{
        address:{
            type:String,
            required: [true, 'Address is required'], 
        },
        time:{
            type: Date,
            default:new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
        },
        collector:{
            type:String,
        }
    },
    collectionInfo:{
        collection:{
            type:String,
            required:[true,'Collection Info is required']
        },
        quantity:{
            type:Number,
            required:[true,'Quantity is required']
        }
    },
    assessmentReport:{
        status:{
            enum: ['Accepted', 'Rejected', 'No response'], 
            default: ['No response']
        }, 

        report:{
            //check whats needed
        },

        outcome:{
            //check whats needed
        }
    },
    paymentMethod:{
        type:String,
        required:[true,'Payment Method is required']
    }
})

const Appointment =  mongoose.Model('Appointment' , userSchema )

module.exports = Appointment
