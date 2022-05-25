import React, { useState, useEffect } from 'react'

const Timer = ({startTime, headsUpTime}) => {
    const [clock, setClock] = useState(startTime)

    useEffect(
        () => {
            let timer = setTimeout(() => setClock(clock - 1), 1000)
            return () => {clearTimeout(timer)}
        }
    )
    
    const getSeconds = rawTime => {
        let seconds = rawTime % 60
        if (seconds < 10) {
            seconds = ('0' + seconds).slice(-2)
        }
        return seconds
    }
    
    const getMinutes = rawTime => Math.floor(rawTime / 60)

    const textStyle = {
        color: 'green',
        fontStyle: 'bold',
        fontSize: 16
    }
    
    return(
        <div style={textStyle}>
            {(clock > headsUpTime)
                ? <h3>{getMinutes(clock)} : {getSeconds(clock)}</h3>
                : (clock > 0 && clock <= headsUpTime)
                    ? <div><h3>{getMinutes(clock)} : {getSeconds(clock)}</h3><p>Aloita jos äskeinen sarja tuntui kevyeltä</p></div>
                    : <div><h3>0 : 00</h3><p>Aloita!</p></div>
            }
        </div>
    )
}

export default Timer