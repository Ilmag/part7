const supertest = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')
const Blog = require('../models/blog')

describe('test blogs api, no Auth needed', () => {
    beforeEach(async() => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.blogs)
    })

    test('api makes GET request, content-type is ok, all records in DB', async() => {
        const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
        const blogs = await api.get('/api/blogs')
        expect(blogs.body).toHaveLength(helper.blogs.length)
    })

    test('api makes GET request, content-type is ok, all records in DB', async() => {
        const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
        const blogs = await api.get('/api/blogs')
        expect(blogs.body).toHaveLength(helper.blogs.length)
    })

    test('test id', async() => {
        const response = await api.get('/api/blogs')
        const record = response.body[0]
        expect(record.id).toBeDefined()
    })

    test('try to update', async() => {
        let blogs = await api.get('/api/blogs')
        const blogToBeUpdated = blogs.body[0]
        const updatedBlog = {...blogToBeUpdated, likes: blogToBeUpdated.likes + 10 }
        const blog = {
            title: updatedBlog.title,
            author: updatedBlog.author,
            url: updatedBlog.url,
            likes: updatedBlog.likes
        }

        await Blog.findByIdAndUpdate(updatedBlog.id, blog, { new: true })
        const blogInDB = await Blog.find({ _id: updatedBlog.id })
        blogs = await api.get('/api/blogs')
        expect(updatedBlog).not.toEqual(blogToBeUpdated)
    })
})

describe('test users api', () => {
    beforeEach(async() => {
        await User.deleteMany({})
        await User.insertMany(helper.users)
    })

    test('username must be uniqe', async() => {
        const usersAtStart = await User.find({})
        const existingUser = helper.users[0]
        const result = await api.post('/api/users').send(existingUser).expect(400).expect('Content-Type', /application\/json/)
        console.log(result.body)

        expect(result.body.error).toContain('username must be unique')

        const usersAtEnd = await User.find({})
        expect(usersAtEnd).toEqual(usersAtStart)
    })
})

describe('test blogs api, Auth required', () => {
    beforeEach(async() => {
        await Blog.deleteMany({})
        const blogsInDB = await Blog.insertMany(helper.blogs)
        await User.deleteMany({})
        for (let i = 0; i < helper.users.length; i++) {
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(helper.users[i].password, saltRounds)

            const userForTest = new User({
                username: helper.users[i].username,
                name: helper.users[i].name,
                passwordHash
            })

            await userForTest.save()
        }

        const usersInDB = await User.find({})

        let blogsIndex = 0
        usersInDB.forEach(async user => {
            for (let i = 0; i < blogsInDB.length / 2; i++) {
                const blog = blogsInDB[blogsIndex]
                blogsIndex++
                user.blogs = user.blogs.concat(blog._id)
                await user.save()
            }
        })

        usersInDB.forEach((user) => {
            user.blogs.forEach(async blog => {
                const blogFound = await Blog.findById(blog)
                blogFound.user = user._id
                await blogFound.save()
            })
        })

        const response = await api.get('/api/users')
        const user = response.body[0]
        const password = helper.users.filter(u => u.username === user.username)[0].password
        const userForLogin = {
            username: user.username,
            password: password
        }
        const resp = await api.post('/api/login').send(userForLogin).expect(200).expect('Content-Type', /application\/json/)
        const token = resp.body.token
        console.log('token', token)
    })

    test('test post request', async() => {
        const newBlog = {
            title: 'Blog for testing',
            author: 'ME',
            url: 'someurladdress',
            likes: 1000
        }

        await api.post('/api/blogs').set('Authorization', 'Bearer ' + token).send(newBlog).expect(201).expect('Content-Type', /application\/json/)
        const currentRecords = await api.get('/api/blogs')
        expect(currentRecords.body).toHaveLength(helper.blogs.length + 1)

        const titles = currentRecords.body.map(blog => blog.title)
        expect(titles).toContain('Blog for testing')
    })

    test('likes defaults to zero', async() => {
        const newBlog = {
            title: 'Check likes',
            author: 'ME',
            url: 'someurladdress',
        }

        await api.post('/api/blogs').set('Authorization', 'Bearer ' + token).send(newBlog).expect(201)
        const checkBlog = await Blog.find({ title: 'Check likes' })
        expect(checkBlog[0].likes).toEqual(0)
    })

    test('titles and urls', () => {
        const blogsForTest = [{
                author: 'ME',
                url: 'someurladdress',
                likes: 1000
            },
            {
                title: 'Blog for testing',
                author: 'ME',
                likes: 1000
            },
            {
                author: 'ME',
                likes: 1000
            }
        ]

        blogsForTest.forEach(blog => async() => {
            await api.post('/api/blogs').set('Authorization', 'Bearer ' + token).send(blog).expect(400)
        })
    })

    test('deletion is ok', async() => {
        const startBlogs = await api.get('/api/blogs')
        const toBeDeleted = startBlogs.body[0]

        await api.delete(`/api/blogs/${toBeDeleted.id}`).expect(204)

        const endBlogs = await api.get('/api/blogs')
        expect(endBlogs.body).toHaveLength(startBlogs.body.length - 1)

        const finalIds = endBlogs.body.map(blog => blog.id)
        expect(finalIds).not.toContain(toBeDeleted.id)
    })

    test('response code is 401, if a token is not provided', async() => {
        const newBlog = {
            title: 'Blog for testing',
            author: 'ME',
            url: 'someurladdress',
            likes: 1000
        }

        const response = await api.post('/api/blogs').send(newBlog).expect(401)
    })
})

afterAll(() => {
    mongoose.connection.close()
})