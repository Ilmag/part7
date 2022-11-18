import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import loginService from './services/login'
import blogService from './services/blogs'

import Login from './components/Login'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import Users from './components/Users'
import Home from './components/Home'
import Blogs from './components/Blogs'
import BlogView from './components/BlogView'
import User from './components/User'

import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/usersReducer'
import { getUser } from './reducers/userReducer'
import { getUserName } from './reducers/usernameReducer'
import { getPassword } from './reducers/passworReducer'
import { throwNotification } from './reducers/messageReducers'
import { throwError } from './reducers/errorReducer'

import { Container } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const App = ({ Link, Route, Routes, useMatch }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initBlogs())
        dispatch(initUsers())
    }, [dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(getUser(user))
            blogService.setToken(user.token)
        }
    }, [])

    const username = useSelector((state) => state.username)
    const password = useSelector((state) => state.password)
    const blogs = useSelector((state) => state.blogs)
    const notification = useSelector((state) => state.notifications)
    const errorMessage = useSelector((state) => state.errors)

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const user = await loginService.login(username, password)

            blogService.setToken(user.token)
            dispatch(getUser(user))
            dispatch(getUserName(''))
            dispatch(getPassword(''))
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            dispatch(throwNotification(`user ${user.username} logged in`))
            setTimeout(() => {
                dispatch(throwNotification(null))
            }, 5000)
        } catch (exception) {
            dispatch(throwError('wrong credentials'))
            setTimeout(() => {
                dispatch(throwError(null))
            }, 5000)
            console.log(exception)
        }
    }

    const handleLogout = () => {
        dispatch(throwNotification(`user ${user.name} logged out`))
        dispatch(getUser(null))
        window.localStorage.clear()
        setTimeout(() => {
            dispatch(throwNotification(null))
        }, 5000)
    }

    const user = useSelector((state) => state.user)
    const users = useSelector((state) => state.users)

    const match = useMatch('/blogs/:id')
    const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

    const matchUser = useMatch('/users/:id')
    const userPath = matchUser ? users.find((user) => user.id === matchUser.params.id) : null

    return (
        <Container>
            <Notification notification={notification} />
            <ErrorMessage errorMessage={errorMessage} />
            {user === null ? (
                <Login username={username} password={password} handleLogin={handleLogin} />
            ) : (
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" noWrap sx={{ marginBottom: '0.5rem' }}>
                            Blogs App
                        </Typography>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/"
                            sx={{ marginLeft: '0.5rem' }}>
                            HOME
                        </Button>
                        <Button color="inherit" component={Link} to="/blogs">
                            BLOGS
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/users"
                            sx={{ marginRight: '05.rem' }}>
                            USERS
                        </Button>
                        <Typography sx={{ margin: '0.5rem' }}>
                            <em style={{ marginRight: '0.5rem' }}>{user.name}</em> is logged in
                        </Typography>
                        <Button variant="outlined" color="error" onClick={handleLogout}>
                            logout
                        </Button>
                    </Toolbar>
                </AppBar>
            )}
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/users"
                        element={<Users users={users} blogs={blogs} Link={Link} />}
                    />
                    <Route path="/blogs" element={<Blogs blogs={blogs} Link={Link} />} />
                    <Route path="/blogs/:id" element={<BlogView blog={blog} />} />
                    <Route path="/users/:id" element={<User userPath={userPath} />} />
                </Routes>
            </div>
        </Container>
    )
}

export default App
