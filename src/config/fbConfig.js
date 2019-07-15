import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBl_fFjW_KaSz316r1tkiXdnvFEvIsD_rY",
    authDomain: "manager-a1d41.firebaseapp.com",
    databaseURL: "https://manager-a1d41.firebaseio.com",
    projectId: "manager-a1d41",
    storageBucket: "manager-a1d41.appspot.com",
    messagingSenderId: "191419593690",
    appId: "1:191419593690:web:84545e844b6d49e5"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
