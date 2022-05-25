import React, { useState, useEffect } from 'react'
import { StandardButton } from '../styles/Buttons'
import userService from '../services/UserService'
import cycleService from '../services/CycleService'

const AccountDetails = ( {userdata, handleDelete} ) => {
    const [profile, setProfile] = useState({})
    const [currentCycle, setCurrentCycle] = useState({})

    useEffect(() => {
        userService
            .getCurrent()
            .then(response => setProfile(response))
            .catch(error => console.log(error))
        cycleService
            .getCurrent()
            .then(response => setCurrentCycle(response))
            .catch(error => console.log(error))
    }, [])

    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td><b>Profiili: {profile.username}</b></td>                    
                </tr>
                <tr>
                    <td>Voimatasot alussa (5 RM)</td>
                </tr>
                    <td>Kyykky</td>
                    <td>{profile.bestSquat}</td>
                <tr>
                </tr>
                    <td>Penkki</td>
                    <td>{profile.bestBenchPress}</td>
                <tr>
                </tr>
                    <td>Kulmasoutu</td>
                    <td>{profile.bestBarbellRow}</td>
                <tr>
                </tr>
                    <td>Pystypunnerrys</td>
                    <td>{profile.bestOverheadPress}</td>
                <tr>
                </tr>
                    <td>Maastaveto</td>
                    <td>{profile.bestDeadlift}</td>
                <tr>
                    <td><b>Meneillään oleva treenikierto</b></td>
                </tr>
                <tr>
                    <td>Aloitettu</td>
                    <td>{currentCycle.startDate}</td>
                </tr>
                <tr>
                    <td> <StandardButton onClick={handleDelete}>Poista käyttäjätili</StandardButton></td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default AccountDetails