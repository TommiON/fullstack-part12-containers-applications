import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ( {message, error} ) => {
    if(message === '' || message === undefined) {
        return null
    }

    let mode
    if(error) {
        mode='danger'
    } else {
        mode='success'
    }

    return(
        <Alert variant={mode}>
            {message}
        </Alert>
    )
}

export default Notification