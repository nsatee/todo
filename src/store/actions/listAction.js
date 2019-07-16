
export const createList = (list) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
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

export const createItem = (itemInfo) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('items').add({
            creator: itemInfo.creator,
            itemContent: itemInfo.itemInfo,
            isDone: false,
            listId: itemInfo.listId,
            createdAt: new Date()
        }).then(() => {
            dispatch({type: "CREATE_ITEM_SUCCESS"})
        })
    }
}

export const checkItem = (itemId, status) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('items').doc(itemId).update({
            isDone: !status
        }).then(() => {
            dispatch({type: 'CHECK_UPDATE'});
        })
    }
}