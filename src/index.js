import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers/rootReducer';
import thunk from 'redux-thunk';
import { getFirestore, reduxFirestore } from 'redux-firestore';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import fbConfig from './config/fbConfig'
import { actionTypes } from 'redux-firestore'

const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        reduxFirestore(fbConfig),
        reactReduxFirebase(fbConfig, {
            useFirestoreForProfile: true, 
            userProfile: 'users', 
            attachAuthIsReady: true, 
            onAuthStateChanged: (authData, firebase, dispatch) => {
                // Clear redux-firestore state if auth does not exist (i.e logout)
                if (authData === null) {
                    dispatch({ type: actionTypes.CLEAR_DATA })
                }
            }
        })
    )
)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
