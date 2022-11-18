const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestsLogger = (request, response, next) => {
    logger.info('method:', request.method)
    logger.info('path:', request.path)
    logger.info('body:', request.body)
    logger.info('-----')

    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'invalid token' })
    }
    logger.error(error.message)
    next(error)
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (!authorization) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }
    next()
}

const userExtractor = async(request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        token = authorization.substring(7)
    }
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    request.user = await User.findById(decodedToken.id)
    next()
}

module.exports = {
    requestsLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}