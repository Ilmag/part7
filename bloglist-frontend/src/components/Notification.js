import { useSelector } from 'react-redux'
import Alert from '@mui/material/Alert'

const Notification = ({ notification }) => {
    const errorsStore = useSelector((state) => state.errorsStore)

    if (notification === null) {
        return null
    }

    if (errorsStore) {
        console.log(errorsStore)
        return null
    }

    return <Alert severity="success">{notification}</Alert>
}

export default Notification
