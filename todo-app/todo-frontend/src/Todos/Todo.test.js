import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Todo from './Todo'

test('renders content', () => {
    const component = render(
        <Todo text='testiteksti' done={true} />
    )

    expect(component.container).toHaveTextContent('testiteksti')
})