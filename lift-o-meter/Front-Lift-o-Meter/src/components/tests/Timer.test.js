import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Timer from '../Timer'

test('renders content', () => {
    const component = render(
        <Timer startTime={10} headsUpTime={5} />
    )

    expect(component.container).toHaveTextContent('0 : 10')

    const component2 = render(
        <Timer startTime={180} headsUpTime={5} />
    )
    expect(component2.container).toHaveTextContent('3 : 00')

})