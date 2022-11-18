import { createSlice } from '@reduxjs/toolkit'

const usernameSlice = createSlice({
    name: 'username',
    initialState: '',
    reducers: {
        setUserName(state, action) {
            const username = action.payload
            return username
        }
    }
})

export const getUserName = (username) => {
    return (dispatch) => {
        dispatch(setUserName(username))
    }
}

export const { setUserName } = usernameSlice.actions
export default usernameSlice.reducer
