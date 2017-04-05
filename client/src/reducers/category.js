function category(state= [],action){
    switch(action.type){
        case 'SYNCCATEGORY':
            return action.data
        default:
            return state
    }
}

export default category