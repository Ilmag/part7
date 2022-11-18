const blogsRouter = require('express').Router()
    // const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({})
        .populate('user', { name: 1 })
        .populate('comments', { content: 1 })
        // const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.get('/unpopulated', async(request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', middleware.tokenExtractor, async(request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0,
        user: user._id
    })

    if (blog.title && blog.url) {
        try {
            const savedBlog = await blog.save()
            response.status(201).json(savedBlog)
            user.blogs = user.blogs.concat(savedBlog._id)
            await user.save()
        } catch (exception) {
            next(exception)
        }
    } else {
        response.status(400)
    }
})

blogsRouter.delete('/:id', middleware.userExtractor, async(request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (request.user._id.toString() === blog.user.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        return response.status(401).json({ error: 'user can not delete the blog' })
    }
})

blogsRouter.put('/:id', async(request, response, next) => {
    const body = request.body

    const updatedBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: body.user
    }

    try {
        await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
        response.json(updatedBlog)
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter