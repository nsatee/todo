import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase';

import authReducer from './authReducer';
import listReducer from './listReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    lists: listReducer,
    firestoreReducer: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer;