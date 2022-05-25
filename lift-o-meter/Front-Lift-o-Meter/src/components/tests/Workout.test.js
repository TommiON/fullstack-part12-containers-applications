import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Workout from '../Workout'

test('Renders start text when launched with no data available', () => {
    
    const component = render(<Workout />)

    expect(component.container).toHaveTextContent('Loading...')
})