const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    sellRoom: {
        type: mongoose.Types.ObjectId, 
        ref: 'SellRoom',
        required: [true, 'An appointment needs to reference a sell room.']
    },
    user:{
        type: mongoose.Types.ObjectId, 
        ref: 'User', 
        require: [true, 'An appointment needs to be for a user.']
    },
    appointmentDetails:{
        address:{                   //do we even need this when the user is already referenced?
            type:String,
            required: [true, 'Address is required'], 
        },
        date: {
            type: Date, 
            required: [true, 'An appointment needs a date.']
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
            type: [String]
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


const Appointment =  mongoose.model('Appointment', appointmentSchema)

module.exports = Appointment

