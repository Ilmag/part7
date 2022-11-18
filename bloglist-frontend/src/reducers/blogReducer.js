import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { throwError } from './errorReducer'
import { setErrorsStore } from './errorsStore'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            const blogs = action.payload
            blogs.sort((a, b) => b.likes - a.likes)
            return blogs
        },
        addBlog(state, action) {
            const newBlog = action.payload
            return [...state, newBlog]
        },
        updateBlog(state, action) {
            const id = action.payload.id
            const afterLike = action.payload
            const blogs = state.map((blog) => (blog.id !== id ? blog : afterLike))
            blogs.sort((a, b) => b.likes - a.likes)
            return blogs
        },
        removeBlog(state, action) {
            const id = action.payload
            const blogs = state.filter((blog) => blog.id !== id)
            return blogs
        }
    }
})

export const initBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (newBlog) => {
    return async (dispatch) => {
        const blog = await blogService.create(newBlog)
        dispatch(addBlog(blog))
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const likeBlog = (id) => {
    return async (dispatch) => {
        const blogs = await blogService.getUnpopulated()
        const blogToLike = blogs.find((blog) => blog.id === id)
        const afterLike = { ...blogToLike, likes: blogToLike.likes + 1 }
        await blogService.update(afterLike.id, afterLike)
        dispatch(updateBlog(afterLike))
    }
}

export const deleteBlog = (id) => {
    return async (dispatch) => {
        try {
            await blogService.remove(id)
            dispatch(removeBlog(id))
        } catch (error) {
            dispatch(setErrorsStore(error.message))
            dispatch(throwError(error.message))
            setTimeout(() => {
                dispatch(throwError(null))
                dispatch(setErrorsStore(null))
            }, 6000)
        }
    }
}

export const { setBlogs, addBlog, updateBlog, removeBlog } = blogSlice.actions
export default blogSlice.reducer
