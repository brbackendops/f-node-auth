const express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/v1/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get("/health", (req,res) => {
    res.status(200).json({
        "status": "success",
        "message": "OK"
    })
})

// user router
const userRouter = require('./router/user.router')
app.use("/",userRouter)


// global error handling
// const errorHandler = require('./middlewares/error')
// app.use(errorHandler)

module.exports = app