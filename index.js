const express = require('express')
const app = express()
var cors = require('cors')
require('dotenv').config()


app.use(cors())
const PORT = 8000


app.use('/', (req,res) => {
  res.send({ sucess: true, message: "Welcome to Quiz API"})
})



app.listen(process.env.PORT, () => {
  console.log(`App listening on port: ${PORT}`)
})