const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const productRoutes = require('./api/routes/products')

const orderRoutes = require('./api/routes/orders')

const userRoutes = require('./api/routes/user')

mongoose.connect(process.env.MONGODB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true })

// Morgan middleware logs http requests to the terminal
app.use(morgan('dev'));
// Allows public access to the uploads image folder
app.use('/uploads', express.static('uploads'))
// Parses url encoded bodies and JSON
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
// These headers prevent CORS errors and allow all clients to request data from the server
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

app.use('/products', productRoutes)

app.use('/orders', orderRoutes)
app.use('/user', userRoutes)
app.use((req, res, next) => {
    const error = new Error('Page not found');
    error.status = 404
    next(error)
})

app.use((error,req, res, next)  => {
    res.status(error.status || 500)
    res.json({
        message: error.message
    })
})
module.exports = app