const appError = require("../utils/appError.js")

const handleCastError =(err)=>{
    const message = `${err.path} contains an invalid value: ${err.value}.`
    return new appError(message, 400)
}
const handleValidationError = err =>{
    const errors = Object.values(err.errors).map(el =>{
        el.message
    })
    const message = `Invalid input data used. ${errors.join('. ')}`
    return new appError(message, 400)
}

const handleExpiredTokenError = err =>{ 
    return new appError("Token expired, please login again", 401)
}

const handleJwtError = err =>{
    return new appError("Token invalid. Please log in", 401)
}
const handleHandleDuplicateFields = err =>{
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
}

const handleDevelopmentError = (err, req, res) =>{
    return res.status(err.statusCode).json({
        status: err.status, 
        message: err.message,
        error: err,
        stack: err.stack
    })
}

const handleProductionError = (err, req, res) =>{
   return res.status(err.statusCode).json({
        status: err.status, 
        message: err.message
    })
}

const globalErrorHandler = (err, req, res, next)=>{ 
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if(process.env.NODE_ENV === 'development'){
        handleDevelopmentError(err, req, res)
        } else if(process.env.NODE_ENV === 'production'){
            let error = {...err}

            if(error.name === 'CastError')error = handleCastError(error)
            if(error.name === 'ValidationError') error = handleValidationError(error)
            if(error.name === 'TokenExpiredError') error = handleExpiredTokenError(error)
            if(error.name === 'JsonWebTokenError') error = handleJwtError(error)
            if(error.code === 1100) error = handleHandleDuplicateFields(error)

        handleProductionError(err, req, res)
    }
}

module.exports = globalErrorHandler