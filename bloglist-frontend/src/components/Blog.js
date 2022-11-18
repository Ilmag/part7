import { useState } from 'react'
import PropTypes from 'prop-types'

import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'

const Blog = ({ blog, addLikes, removeBlog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 2
    }

    const [visible, setVisible] = useState(false)

    const showDetails = { display: visible ? '' : 'none' }

    const toggleDetails = () => {
        setVisible(!visible)
    }

    const handleLikes = async () => {
        const updated = { ...blog, likes: blog.likes + 1 }
        await addLikes(updated)
    }

    const handleBlogRemove = (blog) => {
        if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
            removeBlog(blog)
        }
    }

    return (
        <div style={blogStyle}>
            <div className="title-author">
                <span id="title">{blog.title}</span> <span id="author">{blog.author}</span>
                <Button onClick={toggleDetails} id="show-button">
                    {visible ? 'hide' : 'view'}
                </Button>
            </div>
            <div style={showDetails} id="url-likes">
                <div className="url">{blog.url}</div>
                <div className="likes">
                    likes: {blog.likes}
                    <Button id="like-button" onClick={handleLikes} color="success">
                        like
                    </Button>
                </div>
                <div className="creator">created by: {blog.user[0].name}</div>
                <div className="remove-button">
                    <Button
                        id="remove-button"
                        onClick={() => handleBlogRemove(blog)}
                        variant="outlined"
                        startIcon={<DeleteIcon />}>
                        remove
                    </Button>
                </div>
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    addLikes: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired
}

export default Blog
