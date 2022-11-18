import { useDispatch, useSelector } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { throwNotification } from '../reducers/messageReducers'
import { getComment } from '../reducers/commentReducer'
import { initBlogs } from '../reducers/blogReducer'
import blogService from '../services/blogs'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'

const BlogView = ({ blog }) => {
    if (!blog) {
        return null
    }

    const dispatch = useDispatch()

    const handleLikes = (blog) => {
        dispatch(likeBlog(blog.id))
        dispatch(throwNotification(`you liked ${blog.title} by ${blog.author}`))
        setTimeout(() => {
            dispatch(throwNotification(null))
        }, 5000)
    }

    const comment = useSelector((state) => state.comment)

    const handleComments = async (id, content) => {
        const newComment = {
            content: content,
            blog: id
        }
        await blogService.createComment(newComment)
        dispatch(getComment(''))
        dispatch(initBlogs())
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h4">
                    {blog.title}, Author: {blog.author}
                </Typography>
                <Link href={blog.url} color="primary" underline="always" sx={{ fontSize: '150%' }}>
                    {blog.url}
                </Link>
                <Typography variant="h6">{blog.likes} likes</Typography>
                <Typography>
                    added by <Typography fontSize="150%">{blog.user[0].name}</Typography>
                </Typography>
                <Button variant="outlined" color="success" onClick={() => handleLikes(blog)}>
                    like
                </Button>
                <Typography variant="h6">Comments:</Typography>
                {blog.comments.map((comment) => (
                    <Typography key={blog.id} marginLeft="2rem">
                        {comment.content}
                    </Typography>
                ))}
            </CardContent>
            <CardActions>
                <TextField
                    label="comment"
                    variant="outlined"
                    value={comment}
                    onChange={({ target }) => dispatch(getComment(target.value))}
                />
                <Button onClick={() => handleComments(blog.id, comment)}>add comment</Button>
            </CardActions>
        </Card>
    )
}

export default BlogView
