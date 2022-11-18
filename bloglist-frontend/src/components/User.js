const User = ({ userPath }) => {
    if (!userPath) {
        return null
    }

    return (
        <div>
            <h2>{userPath.name}</h2>
            <h3>Added blogs</h3>
            <uL>
                {userPath.blogs.map((blog) => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </uL>
        </div>
    )
}

export default User
