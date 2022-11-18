import { useDispatch } from 'react-redux'
import { getUserName } from '../reducers/usernameReducer'
import { getPassword } from '../reducers/passworReducer'

const Login = (props) => {
    const dispatch = useDispatch()
    return (
        <div>
            <form onSubmit={props.handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        id="username"
                        value={props.username}
                        name="Username"
                        onChange={({ target }) => dispatch(getUserName(target.value))}
                    />
                </div>
                <div>
                    password
                    <input
                        id="password"
                        type="password"
                        value={props.password}
                        name="Password"
                        onChange={({ target }) => dispatch(getPassword(target.value))}
                    />
                </div>
                <button id="login-button" type="submit">
                    login
                </button>
            </form>
        </div>
    )
}

export default Login
