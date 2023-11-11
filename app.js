const express = require('express')
const userRouter = require('./routes/userRoutes.js')
const appointmentRouter = require('./routes/appointmentRoutes.js')
const collectorRouter = require('./routes/collectorRoutes.js')
const sellRoomRouter = require('./routes/sellRoomRoutes.js')
const cookieParser = require('cookie-parser')
const appError = require('./utils/appError.js')
const globalErrorHandler = require('./controllers/globalErrorHandler.js')
const compression = require('compression')

const app = express()

app.use(compression())
app.use(express.json())
app.use(cookieParser())

// APP ROUTES
app.use('/api/v1/users/', userRouter)
app.use('/api/v1/appointments/', appointmentRouter)
app.use('/api/v1/collectors/', collectorRouter)
app.use('/api/v1/sellrooms', sellRoomRouter)


//Global error handler
app.all('*', (req, res , next)=>{
    return next(new appError(`${req.originalUrl} could not be found on this server.`, 404))
})

app.use(globalErrorHandler)

module.exports = app
