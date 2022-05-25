import React from 'react'
import { StandardButton } from '../styles/Buttons'

const User = ( {userdata, handleDelete} ) => {

    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td><b>{userdata.username}</b></td>
                    <td> <StandardButton onClick={handleDelete}>poista</StandardButton></td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default User
