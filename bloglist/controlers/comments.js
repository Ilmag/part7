const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.post('/:id/comments', async(request, response, next) => {
    const body = request.body
    const blog = await Blog.findById(body.blog)
    console.log(blog)
    const comment = new Comment({
        content: body.content,
        blog: blog._id
    })
    try {
        const savedComment = await comment.save()
        response.status(201).json(savedComment)
        console.log(blog.comments)
        blog.comments = blog.comments.concat(savedComment._id)
        await blog.save()
    } catch (exception) {
        next(exception)
    }
})

module.exports = commentsRouter