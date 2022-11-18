const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

const Notification = ({notification}) => {

    if(notification === null){
        return null
    }

    return(
        <div style={style}>
            {notification}
        </div>
    )
}

export default Notification