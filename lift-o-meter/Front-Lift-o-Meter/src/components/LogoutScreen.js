import React, { useState } from 'react'
import { StandardButton } from '../styles/Buttons'

const LogoutScreen = username => {

    const logout = (event) => {
        // window.localStorage.removeItem('username')
        // window.localStorage.removeItem('accessToken')
        console.log('kirjaudutaan ulos...')
    }

    return(
        <span>
            {username} kirjautunut. <a href="" onClick={logout}>Kirjaudu ulos</a>
        </span>
    )
}

export default LogoutScreen