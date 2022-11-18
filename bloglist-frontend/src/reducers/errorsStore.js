import { createSlice } from '@reduxjs/toolkit'

const errorsSlice = createSlice({
    name: 'errorsStore',
    initialState: null,
    reducers: {
        setErrorsStore(state, action) {
            return action.payload
        }
    }
})

export const storeErrors = (error) => {
    return (dispatch) => {
        dispatch(setErrorsStore(error))
    }
}

export const { setErrorsStore } = errorsSlice.actions
export default errorsSlice.reducer
