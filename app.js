const express = require('express')
const userRouter = require('./routes/userRoutes')
const appointmentRouter = require('./routes/appointmentRoutes')
const collectorRouter = require('./routes/collectorRoutes')
const sellRoomRouter = require('./routes/sellRoomRoutes')
const cookieParser = require('cookie-parser')
const appError = require('./utils/appError')
const globalErrorHandler = require('./controllers/globalError')

const app = express()

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
