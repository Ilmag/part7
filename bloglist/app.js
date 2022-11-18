require('dotenv').config()
const { mongoUrl, PORT } = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controlers/blogs')
const usersRouter = require('./controlers/users')
const loginRouter = require('./controlers/login')
const commentsRouter = require('./controlers/comments')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting', mongoUrl)
logger.info(PORT)

// mongoose.connect(mongoUrl).then(() => {
//     logger.info('connected to', mongoUrl)
// }).catch(error => {
//     logger.error('error connecting to MongoDB:', error.message)
// })
const mongooseConnect = async() => {
    try {
        await mongoose.connect(mongoUrl)
        logger.info('connected to', mongoUrl)
    } catch (exception) {
        logger.error('error connecting to MongoDB:', exception.message)
    }
}

mongooseConnect()

app.use(cors())
app.use(express.json())
app.use(middleware.requestsLogger)

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs', commentsRouter)
if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controlers/testing')
    app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app