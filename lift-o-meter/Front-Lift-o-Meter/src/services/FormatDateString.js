export const FormatDateString = string => {
    if(string) {
        const date = string.split('T')[0]
        const dateComponents = date.split('-')
        const output = dateComponents[2] + '. ' + getMonth(dateComponents[1]) + ' ' + dateComponents[0]
        return output
    }
   
    return null
}

const getMonth = month => {
    switch(month) {
        case '1': return 'tammikuuta'
        case '2': return 'helmikuuta'
        case '3': return 'maaliskuuta'
        case '4': return 'huhtikuuta'
        case '5': return 'toukokuuta'
        case '6': return 'kesäkuuta'
        case '7': return 'heinäkuuta'
        case '8': return 'elokuuta'
        case '9': return 'syyskuuta'
        case '10': return 'lokakuuta'
        case '11': return 'marraskuuta'
        case '12': return 'joulukuuta'
        default: return null
    }
}