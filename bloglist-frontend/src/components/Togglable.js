import { useState, forwardRef, useImperativeHandle } from 'react'
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types'
import { Button } from '@mui/material'

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hideComponent = { display: visible ? 'none' : '' }
    const showComponent = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideComponent}>
                <Button id="create-new-button" onClick={toggleVisibility} variant="outlined">
                    {props.buttonLabel}
                </Button>
            </div>
            <div style={showComponent}>
                {props.children}
                <Button
                    id="cancel-create-button"
                    onClick={toggleVisibility}
                    variant="contained"
                    color="error">
                    cancel
                </Button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

export default Togglable
