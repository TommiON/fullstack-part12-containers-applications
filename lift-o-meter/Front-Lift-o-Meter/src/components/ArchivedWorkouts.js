import React, {useState, useEffect} from 'react'
import workoutService from '../services/WorkoutService'
import SpinnerIndicator from './SpinnerIndicator'
import ArchivedWorkout from './ArchivedWorkout'

const ArchivedWorkouts = () => {

    const [workouts, setWorkouts] = useState(null)

    useEffect(() => {
        workoutService
            .getCompleted()
            .then(response => {
                const filteredWorkouts = response.filter(workout => workout.date !== null)
                setWorkouts(filteredWorkouts)
            })
            .catch(error => console.log('*ArchivedWorkouts, virhe: ', error))
    }, [])

    if(!workouts) {
        return <SpinnerIndicator />
    }

    if(workouts.length === 0) {
        return(
            <p>Harjoituksia ei ole.</p>
        )
    }

    return(
        <div>
            <p>Tähänastiset harjoitukset:</p>
            {workouts.map(
                (workout) => {
                    return <ArchivedWorkout workoutData={workout} key={workout.id} />    
                }
            )}

        </div>
    )

}

export default ArchivedWorkouts