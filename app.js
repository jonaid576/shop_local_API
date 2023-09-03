const express = require("express")
require('dotenv').config()
require('express-async-errors')
const { connect } = require('./db/connect.js')
const { router: productsRouter } = require('./routes/products.js')
const { notFound } = require('./middleware/not-found.js')
const { errorHandler } = require('./middleware/error-handler.js')

const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log('Time', Date.now())
    next()
})

app.use('/api/v1/products', productsRouter)
app.use(notFound)
app.use(errorHandler)



const start = async () => {
    try {
        await connect()
        app.listen(5000, () => console.log("server is listening on port 5000"))
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()
// console.log(module)