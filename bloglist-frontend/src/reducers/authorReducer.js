import { createSlice } from '@reduxjs/toolkit'

const authorSlice = createSlice({
    name: 'author',
    initialState: '',
    reducers: {
        setAuthor(state, action) {
            return action.payload
        }
    }
})

export const getAuthor = (author) => {
    return (dispatch) => {
        dispatch(setAuthor(author))
    }
}

export const { setAuthor } = authorSlice.actions
export default authorSlice.reducer
