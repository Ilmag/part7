import { useState } from "react"
import { useField } from "../hooks"

const CreateNew = (props) => {
    const [resetClick,setResetClick] = useState(false)
    const content = useField('content','text',resetClick)
    const author = useField('author','text',resetClick)
    const info = useField('info','text',resetClick)
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content:content.value,
        author:author.value,
        info:info.value,
        votes: 0
      })
    }

    const setBlank = () => {
      setResetClick(!resetClick)
    }

    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content} />
          </div>
          <div>
            author
            <input {...author} />
          </div>
          <div>
            url for more info
            <input {...info} />
          </div>
          <button type="submit">create</button> <button type="button" onClick={setBlank}>reset</button>
        </form>
      </div>
    )
  
  }

  export default CreateNew