import { createSlice } from '@reduxjs/toolkit'

const urlSlice = createSlice({
    name: 'url',
    initialState: '',
    reducers: {
        setUrl(state, action) {
            return action.payload
        }
    }
})

export const getUrl = (url) => {
    return (dispatch) => {
        dispatch(setUrl(url))
    }
}

export const { setUrl } = urlSlice.actions
export default urlSlice.reducer
