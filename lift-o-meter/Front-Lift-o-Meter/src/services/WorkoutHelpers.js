export const FindUniqueEntries = (entries) => {
    
    var seen = {}   
    return entries.filter(
        (item) => seen.hasOwnProperty(item) ? false : (seen[item] = true)
    )
}

export const GetPlainName = (move) => {
    switch (move) {
        case 'SQUAT':
            return 'Kyykky'
        case 'BENCH':
            return 'Penkkipunnerrus'
        case 'ROW':
            return 'Kulmasoutu'
        case 'OVERHEAD':
            return 'Pystypunnerrus'
        case 'DEADLIFT':
            return 'Maastaveto'
        default:
            break;
    }
}

