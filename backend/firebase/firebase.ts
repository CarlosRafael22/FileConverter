
import admin from 'firebase-admin'

const serviceAccount = require("./firebase.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://shapr3d-c2bba-default-rtdb.europe-west1.firebasedatabase.app"
  });
}

export const database = admin.database()
