import { useState } from 'react'

const useRolloverCounter = (currentValue=null, maxValue=5) => {
    const [value, setValue] = useState(currentValue)

    const decrease = () => {
        if (value === null || value === 0) {
            setValue(maxValue)
        } else {
            setValue(value - 1)
        }
    }

    return { value, decrease }
}

export default useRolloverCounter
