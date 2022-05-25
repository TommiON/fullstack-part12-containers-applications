import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import MoveSet from '../MoveSet'

describe('MoveSet', () => {
    
    test('does not show anything if workout not started', () => {
        const component = render(<MoveSet reps={-1} id={1} workoutStarted={false} />)
        expect(component.container).not.toHaveTextContent('X')
    })
    
    test('displays non-started set correctly', () => {
        const component = render(<MoveSet reps={-1} id={1} workoutStarted={true} />)
        expect(component.container).toHaveTextContent('X')
    })

    test('clicking reduces repetitions', () => {
       
    })
    
})



