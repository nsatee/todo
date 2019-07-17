
export const createList = (list) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('lists').add({
            ...list,
            creatorId: list.creator,
            listName: list.listName,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: "CREATE_LIST_SUCCESS", isLoaded: true, success: true });
        });
    }
}

export const createItem = (itemInfo) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('items').add({
            creator: itemInfo.creator,
            itemContent: itemInfo.itemInfo,
            isDone: false,
            listId: itemInfo.listId,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: "CREATE_ITEM_SUCCESS" })
        })
    }
}

export const checkItem = (itemId, status) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('items').doc(itemId).update({
            isDone: !status
        }).then(() => {
            dispatch({ type: 'CHECK_UPDATE' });
        })
    }
}

export const deleteList = (listId) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('lists').doc(listId).delete().then(() => {
            const items = firestore.collection('items').where('listId', '==', listId);
            items.get().then(function (snapshot) {
                snapshot.forEach(function (doc) {
                    doc.ref.delete();
                });
            });
            dispatch({ type: "DELETE_LIST" });
        })
    }
}

export const updateList = (listId, newName) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('lists').doc(listId).update({
            listName: newName
        }).then(() => {
            dispatch({ type: 'UPDATE_LIST' });
        })
    }
}

export const deleteItem = (itemId) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('items').doc(itemId).delete().then(() => {
            dispatch({ type: "DELETE_ITEM" });
        })
    }
}