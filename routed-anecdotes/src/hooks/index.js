import { useEffect } from "react"
import { useState } from "react"

export const useField = (name,type,click) => {
    const [value,setValue] = useState('')
    const [clickState,setClickState] = useState(click)

    useEffect(() => {
        setClickState(click)
    },[click])

    const onChange = (event) => {
        setClickState(false)
        setValue(event.target.value)
    }

    return { name,type,value:clickState ? '' : value,onChange }
}