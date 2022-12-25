const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    sellRoom: {
        type: mongoose.Types.ObjectId, 
        ref: 'SellRoom',
        required: [true, 'An appointment needs to reference a sell room.'], 
        trim: true
    },
    User:{
        type: mongoose.Types.ObjectId, 
        ref: 'User'
    },
    appointmentDetails:{
        address:{                   //do we even need this when the user is already referenced?
            type:String,
            required: [true, 'Address is required'], 
        },
        time:{
            type: Date,
            default:new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
        },
        collector:{
            type: mongoose.Types.ObjectId,
            ref: 'Collector', 
            required: [true, 'An appointment needs a collector assigned to it.']
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
            type: String
            //check whats needed
        },

        outcome:{
            //check whats needed
        }
    },
    paymentMethod:{
        type:String,
        enum: ['Cash', 'Visa/Debit', 'Account Credit'],
        default: 'Account Credit',
    }
})

const Appointment =  mongoose.Model('Appointment' , userSchema )

module.exports = Appointment

