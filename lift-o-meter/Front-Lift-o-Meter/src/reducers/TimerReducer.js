const TimerReducer = (state, action) => {
    switch (action.type) {
        case 'CLOCKTICK':
            return state - 1
        default:
            return state
    }
}

export const tickClock = () => {
    return {
        type: 'CLOCKTICK'
    }
}

export default TimerReducer