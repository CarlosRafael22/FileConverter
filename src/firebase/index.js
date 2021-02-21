import firebase from "firebase/app"
import "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyDL1LNALuCtngTBsulk23MSCt1ywzIpJt0",
    authDomain: "shapr3d-c2bba.firebaseapp.com",
    databaseURL: "https://shapr3d-c2bba-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "shapr3d-c2bba",
    storageBucket: "shapr3d-c2bba.appspot.com",
    messagingSenderId: "629302910686",
    appId: "1:629302910686:web:cad896914bb45abb782c4f",
    measurementId: "G-W4PZQ5Y401"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase
export const database = firebase.database()
