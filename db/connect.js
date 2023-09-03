const mongoose = require('mongoose')
require('dotenv').config()
const connect = async (url) => {
    return mongoose.connect(process.env.MONGO_URI).then(() => console.log("connected to DB"))
}

module.exports = { connect }