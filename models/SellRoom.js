const mongoose = require('mongoose')

const sellRoomSchema = new mongoose.Schema({
    Description: {
        type: String, 
        required: [true, 'Please Insert SellRoom Description'], 
        trim: true
    },
    TargetItem: {
        type: String, 
        required: [true, 'Please Insert SellRoom Target Item'], 
        trim: true
    },
    ExpiryDate: {
        type: Date, 
        required: [true, 'Please Insert SellRoom ExpiryDate'], 
    },
    userMinRequirements: {
        type: String, 
        required: [true, 'Please Insert SellRoom User Minimum Requirements'], 
        trim: true
    },
    offer:{
        total:{
            type:Number,
            required: [true, 'enter Offer total for this sellRoom'], 
        },
        kg:{
            type:Number,
            required: [true, 'Enter the amount of Kg`s required for this sellRoom'], 
        },
    },
    offerLocation:{ //please check if you really need multiple locations
        type:String,
        required:[true, 'Please Insert SellRoom Location'], 
        trim: true
    },
    appointments:{ // check this ,appointments is using sellroom as ref as well
        type: mongoose.Types.ObjectId, 
        ref: 'Appointment'
    },
    appliedUsers:{ 
        type: mongoose.Types.ObjectId, 
        ref: 'User'
    }

})

const SellRoom =  mongoose.Model('SellRoom' , userSchema )

module.exports = SellRoom
