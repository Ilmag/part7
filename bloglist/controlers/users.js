const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async(request, response, next) => {
    const body = request.body

    const existingUsers = await User.find({})
    if (existingUsers.map((user) => user.username).includes(body.username)) {
        response.status(400).json({ error: 'username must be unique' })
    }

    if (body.password.length < 3) {
        response.status(400).json({ error: 'password not valid' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    try {
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch (exception) {
        next(exception)
    }
})

usersRouter.get('/', async(request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1 })
    response.status(200).json(users)
})

usersRouter.get('/:id', async(request, response) => {
    const user = await User.findById(request.params.id)
    response.status(200).json(user)
})

module.exports = usersRouter