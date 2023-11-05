const dotenv = require('dotenv')
dotenv.config({path: './config.env'})

const mongoose = require('mongoose')
const app = require('./app.js')

const url = process.env.mongoUrl.replace('<PASSWORD>', process.env.mongoPassword).replace('<USERNAME>', process.env.mongoUsername)

mongoose.connect(url, ()=>{
    console.log('Database connection established '.bold.bgBrightGreen)
}).catch(function(err){
    console.log('Could not establish database connection '.black.bgBrightRed)
})


mongoose.connection.on('error', (err)=>{
    console.log(`Database connection error: ${err}`.black.bgBrightRed)
})


const port = 3000;
app.listen(port, () =>{
    console.log(`APP LISTENING ON PORT: ${port}`.yellow.bold)
})