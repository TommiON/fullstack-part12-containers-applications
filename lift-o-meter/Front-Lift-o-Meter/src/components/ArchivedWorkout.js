import React, {useState, useEffect} from 'react'
import SpinnerIndicator from './SpinnerIndicator'
import { FindUniqueEntries, GetPlainName } from '../services/WorkoutHelpers'
import { FormatDateString } from '../services/FormatDateString'

const ArchivedWorkout = ( {workoutData} ) => {

    const [workoutPresentation, setWorkoutPresentation] = useState({
        id: '',
        date: null,
        move1: {
            movename: '',
            weight: '',
            failed: false
        },
        move2: {
            movename: '',
            weight: '',
            failed: false
        },
        move3: {
            movename: '',
            weight: '',
            failed: false
        }
    })

    useEffect(() => {
       setWorkoutPresentation({
           id: workoutData.id,
           date: workoutData.date,
           move1: {
               movename: reduceToMoves(workoutData)[0],
               weight: findWeigthForMove(workoutData)[0],
               failed: findFailureForMove(workoutData)[0]
           },
           move2: {
               movename: reduceToMoves(workoutData)[1],
               weight: findWeigthForMove(workoutData)[1],
               failed: findFailureForMove(workoutData)[1]
           },
           move3: {
               movename: reduceToMoves(workoutData)[2],
               weight: findWeigthForMove(workoutData)[2],
               failed: findFailureForMove(workoutData)[2]
           }
       })

    }, [workoutData])

    
    const reduceToMoves = (workoutData) => {
        const moves = workoutData.sets.map(s => s.move)
        const reducedMoves = FindUniqueEntries(moves)
        const plainNameMoves = reducedMoves.map(m => GetPlainName(m))
        return plainNameMoves
    }

    const findWeigthForMove = (workoutData) => {
        const representativeWeigths = [workoutData.sets[0].weigth, workoutData.sets[5].weigth, workoutData.sets[10].weigth]
        return representativeWeigths
    }

    const findFailureForMove = (workoutData) => {
        const firstMoveSets = workoutData.sets.slice(0, 5)
        const failedInFirst = firstMoveSets.filter(m => m.repetitions < 5)
        var failure1 = false
        if(failedInFirst.length > 0) {
            failure1 = true
        }

        const secondMoveSets = workoutData.sets.slice(5, 10)
        const failedInSecond = secondMoveSets.filter(m => m.repetitions < 5)
        var failure2 = false
        if(failedInSecond.length > 0) {
            failure2 = true
        }

        const thirdMoveSets = workoutData.sets.slice(10)
        const failedInThird = thirdMoveSets.filter(m => m.repetitions < 5)
        var failure3 = false
        if(failedInThird.length > 0) {
            failure3 = true
        }

        return [failure1, failure2, failure3]
    }
    
    if(workoutPresentation.id === undefined || workoutPresentation.id === null) {
        return <SpinnerIndicator />
    }

    return(
        <div>
            <h6>{FormatDateString(workoutPresentation.date)}</h6>
            <p>{workoutPresentation.move1.movename} {workoutPresentation.move1.weight} kg, {workoutPresentation.move1.failed ? 'FAILURE' : ''}</p>
            <p>{workoutPresentation.move2.movename} {workoutPresentation.move2.weight} kg, {workoutPresentation.move2.failed ? 'FAILURE' : ''}</p>
            <p>{workoutPresentation.move3.movename} {workoutPresentation.move3.weight} kg, {workoutPresentation.move3.failed ? 'FAILURE' : ''}</p>

            
        </div>
    )
}

export default ArchivedWorkout