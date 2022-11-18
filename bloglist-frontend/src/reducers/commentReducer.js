import { createSlice } from '@reduxjs/toolkit'

const commentSlice = createSlice({
    name: 'comment',
    initialState: '',
    reducers: {
        addComment(state, action) {
            return action.payload
        }
    }
})

export const getComment = (comment) => {
    return (dispatch) => {
        dispatch(addComment(comment))
    }
}

export const { addComment } = commentSlice.actions
export default commentSlice.reducer
