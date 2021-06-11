const express = require('express')
const app = express()
var cors = require('cors')
require('dotenv').config()

// importing middlewares
const { errorHandler } = require('./middlewares/errorHandler.js')
const { routeNotFound } = require('./middlewares/routeNotFound.js')


// importing diffrent routers
var quizRouter = require('./router/quiz.router.js')
var userRouter = require('./router/user.router.js')


const { initializeDBConnection } = require('./db/db.connect.js')

app.use(cors());

initializeDBConnection()


app.get('/', (req,res) => {
  res.send({ sucess: true, message: "Welcome to Quiz API"})
})


// Router Intialization
app.use('/quiz', quizRouter)
app.use('/user', userRouter)



app.use(routeNotFound)

app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`App listening on port: ${process.env.PORT}`)
})