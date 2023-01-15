const globalErrorHandler = (err, req, res, next)=>{ 

    console.log('global error')
    console.log(err)
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    
}

module.exports = globalErrorHandler