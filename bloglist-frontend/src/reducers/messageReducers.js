import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
    name: 'messages',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            const notification = action.payload
            return notification
        }
    }
})

export const throwNotification = (notification) => {
    return (dispatch) => {
        dispatch(setNotification(notification))
    }
}

export const { setNotification } = messageSlice.actions
export default messageSlice.reducer
