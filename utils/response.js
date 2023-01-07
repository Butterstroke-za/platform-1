module.exports = (res, data, statusCode, message) =>{
    const status = statusCode == 200||201||202||204? 'success' : 'fail'

    return res.status(statusCode).json({
            status,
            message,
            results: data.length,
            data})
}
