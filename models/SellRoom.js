const mongoose = require('mongoose')

const sellRoomSchema = new mongoose.Schema({
   description: {
        type: String, 
        required: [true, 'Please Insert SellRoom Description'], 
        trim: true
    },
    targetItem: {
        type: String, 
        required: [true, 'Please Insert SellRoom Target Item'], 
        trim: true
    },
    expiryDate: {
        type: Date, 
        required: [true, 'Please Insert SellRoom ExpiryDate'], 
    },
    applicantRequirements: {
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
    appointments:[{ // check this ,appointments is using sellroom as ref as well
        type: mongoose.Types.ObjectId, 
        ref: 'Appointment'
    }],
    applicants:[{ 
        type: mongoose.Types.ObjectId, 
        ref: 'User'
    }]

}, {
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true }
})

sellRoomSchema.virtual('application',{
    ref: 'Application', 
    foreignField: 'sellRoom', 
    localField: '_id'
})

const SellRoom =  mongoose.model('SellRoom' , sellRoomSchema )

module.exports = SellRoom
