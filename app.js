const express = require('express')

const app = express()


// TODO:
// create app routes
// create models (own folder)
// create controllers (own folder)
// create routes (own folder)
// link to database 



const port = 3000;
app.listen(port, () =>{
    console.log('connection succeeded....')
})



module.exports = app
