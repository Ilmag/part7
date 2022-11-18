import Typography from '@mui/material/Typography'

const Blogs = ({ blogs, Link }) => {
    return (
        <div>
            {blogs.map((blog) => (
                <Link to={`/blogs/${blog.id}`} key={blog.id}>
                    <Typography sx={{ border: 'solid', borderWidth: 1, padding: '0.5rem' }}>
                        {blog.title}
                    </Typography>
                </Link>
            ))}
        </div>
    )
}

export default Blogs
