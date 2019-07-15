
export const createList = (list) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        console.log(list);
        firestore.collection('lists').add({
            ...list,
            creatorId: list.creator,
            listName: list.listName,
            createdAt: new Date()
        }).then(() => {
            console.log(list);
            dispatch({type: "CREATE_LIST_SUCCESS", isLoaded: true, success: true});
        });
    }
}