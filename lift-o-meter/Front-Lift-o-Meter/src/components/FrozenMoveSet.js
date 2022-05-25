import React, { useState, useEffect } from 'react'
import { MoveSetButton } from '../styles/Buttons'
import moveSetService from '../services/MoveSetService'

const FrozenMoveSet = ( {id} ) => {

    // state on kyllä tälle komponentille overkill...
    const [data, setData] = useState({})

    useEffect(() => {
        moveSetService
            .getOne(id)
            .then(response => setData(response))
            .catch(response => console.log('Virhe haettaessa sarjaa tietokannasta!', response))
    }, [])

    return(
        <div>
            {data.label}
            <MoveSetButton passiveSet>{data.repetitions}</MoveSetButton>
        </div>
    )
}

export default FrozenMoveSet