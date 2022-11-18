import { createSlice } from '@reduxjs/toolkit'

const errorSlice = createSlice({
    name: 'errorNotifications',
    initialState: null,
    reducers: {
        setError(state, action) {
            const errorMessage = action.payload
            return errorMessage
        }
    }
})

export const throwError = (errorMessage) => {
    return (dispatch) => {
        dispatch(setError(errorMessage))
    }
}

export const { setError } = errorSlice.actions
export default errorSlice.reducer
