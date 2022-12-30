const express = require('express')
const userRouter = require('./routes/userRoutes')
const appointmentRouter = require('./routes/appointmentRoutes')
const collectorRouter = require('./routes/collectorRoutes')
const sellRoomRouter = require('./routes/sellRoomRoutes')
// const globalError = require('/helpers/globalError.js')

const app = express()

app.use(express.json())


// APP ROUTES
app.use('/api/v1/users/', userRouter)
app.use('/api/v1/appointments/', appointmentRouter)
app.use('/api/v1/collectors/', collectorRouter)
app.use('/api/v1/sellrooms', sellRoomRouter)

//Global error handler
app.all('*', (err, req, res , next)=>{
    console.log('global error handler')
})


module.exports = app
