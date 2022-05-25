import React, { useState, useEffect } from 'react'
import userService from '../services/UserService'
import User from './User'

const Userlist = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        userService
            .getAll()
            .then(response => setUsers(response))
            .catch(error => console.log('virhe: ', error))
    }, [])

    const deleteUser = (id) => {
        userService
            .deleteOne(id)
            .then(setUsers(users.filter(u => u.id !== id)))  
    }

    /*
    const addUser = (userdata) => {
        userService
            .postNew(userdata)
            .then(response => setUsers(users.concat(response.data)))
    }
    */

    return(
        <div>
            <h3>Käyttäjät</h3>
            {console.log('käyttäjät: ', users)}
            {users.map(user => <User key={user.id} userdata={user} handleDelete={() => deleteUser(user.id)} />)}
        </div>
    )
    
}

export default Userlist