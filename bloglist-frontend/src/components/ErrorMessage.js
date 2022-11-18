import Alert from '@mui/material/Alert'

const ErrorMessage = ({ errorMessage }) => {
    if (errorMessage === null) {
        return null
    }

    return <Alert severity="error">{errorMessage}</Alert>
}

export default ErrorMessage
