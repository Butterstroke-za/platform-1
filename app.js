const express = require('express')
const userRouter = require('./routes/userRoutes')
const appointmentRouter = require('./routes/appointmentRoutes')
const collectorRouter = require('./routes/collectorRoutes')

const app = express()

app.use(express.json())


// APP ROUTES
app.use('/api/v1/users/', userRouter)
app.use('/api/v1/appointments/', appointmentRouter)
app.use('/api/v1/collectors/', collectorRouter)


module.exports = app
