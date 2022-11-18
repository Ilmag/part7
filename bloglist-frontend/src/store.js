import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import usersReducer from './reducers/usersReducer'
import userReducer from './reducers/userReducer'
import usernameReducer from './reducers/usernameReducer'
import passworReducer from './reducers/passworReducer'
import messageReducers from './reducers/messageReducers'
import errorReducer from './reducers/errorReducer'
import errorsStore from './reducers/errorsStore'
import tilteReducer from './reducers/tilteReducer'
import authorReducer from './reducers/authorReducer'
import urlReducer from './reducers/urlReducer'
import commentReducer from './reducers/commentReducer'

const store = configureStore(
    {
        reducer: {
            blogs: blogReducer,
            users: usersReducer,
            user: userReducer,
            username: usernameReducer,
            password: passworReducer,
            notifications: messageReducers,
            errors: errorReducer,
            errorsStore: errorsStore,
            title: tilteReducer,
            author: authorReducer,
            url: urlReducer,
            comment: commentReducer
        }
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
