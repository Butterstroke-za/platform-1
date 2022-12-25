exports.createAppointment =  async(req, res, next)=>{
    console.log('create new appointment here')

    try{
        res.status(200).json({
            status: 'success', 
            message: 'appointment created successfully', 
            data: appointment
        })
    }catch(err){
        res.status(400).json({
            status: 'error', 
            message: 'something went wrong', 
            error: err
        })
    }

}

exports.updateAppointment = (req, res, next) =>{
    console.log('update already existing appointment here')
}