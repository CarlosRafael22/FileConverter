
import admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: process.env.FIREBASE_ADMIN_type,
      projectId: process.env.FIREBASE_ADMIN_project_id,
      privateKeyId: process.env.FIREBASE_ADMIN_private_key_id,
      privateKey: process.env.FIREBASE_ADMIN_private_key,
      clientEmail: process.env.FIREBASE_ADMIN_client_email,
      clientId: process.env.FIREBASE_ADMIN_client_id,
      authUri: process.env.FIREBASE_ADMIN_auth_uri,
      tokenUri: process.env.FIREBASE_ADMIN_token_uri,
      authProviderX509CertUrl: process.env.FIREBASE_ADMIN_auth_provider_x509_cert_url,
      clientX509CertUrl: process.env.FIREBASE_ADMIN_client_x509_cert_url
    }),
    databaseURL: "https://shapr3d-c2bba-default-rtdb.europe-west1.firebasedatabase.app"
  });
}

export const database = admin.database()
