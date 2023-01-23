const mongoose = require("mongoose")

const applicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId, 
        ref: 'User', 
        required: [true, 'An application needs to belong to a user.']
    }, 
    sellRoom: {
        type: mongoose.Types.ObjectId, 
        ref: 'SellRoom'
    }, 
    treeImages:[{
        type: String, 
        required: [true, 'Images of the users trees are required.']
    }], 
    fruitImages: [{
        type: String, 
        required: [true, 'Close up images of the trees fruits are required']
    }], 
    additionalNotes: {
        type: String, 
    }

})

const Application = mongoose.model('Application', applicationSchema)
module.exports = Application