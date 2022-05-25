import React from 'react'
import { MoveSetButton } from '../styles/Buttons'

const MoveSet = ({reps, id, workoutStarted, clickHandler}) => {

    const getRepetitionButton = () => {
        if(!workoutStarted) {
            return null
        }

        switch(reps) {
            case -1:
                return(
                    <div>
                        <MoveSetButton emptySet onClick={() => clickHandler(id)}>X</MoveSetButton>
                    </div>
                )
            case 5:
                return(
                    <div>
                        <MoveSetButton fullSet onClick={() => clickHandler(id)}>{reps}</MoveSetButton>
                    </div>
                )
            default:
                return(
                    <div>
                        <MoveSetButton partialSet onClick={() => clickHandler(id)}>{reps}</MoveSetButton>
                    </div>
                )
        }
    }

    return(
        <div>
            {getRepetitionButton(reps)}
        </div>
    )

}

export default MoveSet