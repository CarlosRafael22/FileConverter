
import admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_ADMIN_project_id,
      privateKey: process.env.FIREBASE_ADMIN_private_key,
      clientEmail: process.env.FIREBASE_ADMIN_client_email,
    }),
    databaseURL: "https://shapr3d-c2bba-default-rtdb.europe-west1.firebasedatabase.app"
  });
}

export const database = admin.database()
