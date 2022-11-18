import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createBlog, likeBlog, deleteBlog } from '../reducers/blogReducer'
import { throwNotification } from '../reducers/messageReducers'

import Togglable from './Togglable'
import Add from './Add'
import Blog from './Blog'

const Home = () => {
    const blogsRef = useRef()

    const dispatch = useDispatch()

    const blogs = useSelector((state) => state.blogs)

    const addBlog = (newBlog) => {
        dispatch(createBlog(newBlog))
        dispatch(throwNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`))
        setTimeout(() => {
            dispatch(throwNotification(null))
        }, 5000)
    }

    const addLikes = (updated) => {
        dispatch(likeBlog(updated.id))
        dispatch(throwNotification(`you liked ${updated.title} by ${updated.author}`))
        setTimeout(() => {
            dispatch(throwNotification(null))
        }, 5000)
    }

    const removeBlog = (blog) => {
        dispatch(deleteBlog(blog.id))
        setTimeout(() => {
            dispatch(throwNotification(`you deleted blog ${blog.title}`))
        }, 1000)
        setTimeout(() => {
            dispatch(throwNotification(null))
        }, 6000)
    }

    return (
        <div>
            <Togglable buttonLabel="create new blog" ref={blogsRef}>
                <Add createBlog={addBlog} />
            </Togglable>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} addLikes={addLikes} removeBlog={removeBlog} />
            ))}
        </div>
    )
}

export default Home
