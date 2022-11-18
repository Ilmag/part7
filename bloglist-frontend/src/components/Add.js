import { useDispatch, useSelector } from 'react-redux'
import { getTitle } from '../reducers/tilteReducer'
import { getAuthor } from '../reducers/authorReducer'
import { getUrl } from '../reducers/urlReducer'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const Add = (props) => {
    const dispatch = useDispatch()

    const title = useSelector((state) => state.title)
    const author = useSelector((state) => state.author)
    const url = useSelector((state) => state.url)

    const addBlog = (event) => {
        event.preventDefault()

        const newBlog = {
            title: title,
            author: author,
            url: url
        }

        props.createBlog(newBlog)
        dispatch(getTitle(''))
        dispatch(getAuthor(''))
        dispatch(getUrl(''))
    }

    return (
        <div>
            <h2>create new</h2>
            <div>
                <form onSubmit={addBlog}>
                    <div>
                        <TextField
                            label="title"
                            id="title"
                            size="small"
                            value={title}
                            onChange={({ target }) => dispatch(getTitle(target.value))}
                        />
                    </div>
                    <div>
                        <TextField
                            label="author"
                            id="author"
                            size="small"
                            value={author}
                            onChange={({ target }) => dispatch(getAuthor(target.value))}
                        />
                    </div>
                    <div>
                        <TextField
                            label="url"
                            id="url-address"
                            size="small"
                            onChange={({ target }) => dispatch(getUrl(target.value))}
                        />
                    </div>
                    <Button id="create-blog" variant="contained" type="submit">
                        create
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Add
