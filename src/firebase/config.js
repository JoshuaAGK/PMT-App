import * as firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAmhl4_iDPaAZXXa9kX8Ih86-G3jHCU0OQ",
    authDomain: "pmt-project-3b78e.firebaseapp.com",
    databaseURL: "https://pmt-project-3b78e-default-rtdb.firebaseio.com",
    projectId: "pmt-project-3b78e",
    storageBucket: "pmt-project-3b78e.appspot.com",
    messagingSenderId: "124983312526",
    appId: "1:124983312526:web:fef40f53991deb7b5a09df",
    measurementId: "G-094EV1ZT5K",
};
firebase.initializeApp(firebaseConfig);

export { firebase };
