import * as admin from 'firebase-admin';

export const verifyIdToken = (token: string): Promise<admin.auth.DecodedIdToken | void> => {
  const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // https://stackoverflow.com/a/41044630/1332513
        privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
      }),
    });
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch((error): void => {
      throw error;
    });
};