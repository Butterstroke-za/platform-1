const appError = require('/utils/appError')

module.exports = (err, req, res, next)=>{
    res.status(err.statusCode).json({
        message, 
        message: err.mesage
    })
}