const initState = {
    errMsg: null,
    isLoaded: false
}

const listReducer = (state = initState, action) => {
    switch(action.type) {
        case "CREATE_LIST_SUCCESS":
            return {...state, isLoaded: true}
        default:
            return state;
    }
}


export default listReducer;