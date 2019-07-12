export const createList = (list) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'CREATE_LIST', list })
    }
}