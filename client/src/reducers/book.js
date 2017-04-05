function book(state = [], action) {
    switch (action.type) {
        case 'SYNCBOOK':
            return action.data  
        default:
            return state
    }
}

export default book