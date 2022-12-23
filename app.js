const express = require('express')
const userRouter = require('./routes/userRoutes')

const app = express()


// APP ROUTES
app.use('/api/v1/users/', userRouter)


module.exports = app
