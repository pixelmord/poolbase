import * as functions from 'firebase-functions';
import * as zod from 'zod';
import { DocumentReference, DocumentData, FieldValue } from '@google-cloud/firestore';

import admin, { firestore } from '../lib/initFirebaseAdmin';

import { PageSchema, PageData } from '../lib';
const URLDataSchema = PageSchema.pick({ url: true, title: true });
type URLData = zod.infer<typeof URLDataSchema>;

export const addURLHandler = functions.region('europe-west1').https.onCall(
  async (data: URLData, context): Promise<void | DocumentReference<DocumentData>> => {
    // Checking that the user is authenticated.
    // TODO: reinstate security @see: https://github.com/composableweb/poolbase/issues/76
    // if (!context.auth) {
    //   // Throwing an HttpsError so that the client gets the error details.
    //   throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
    // }
    // Checking attribute.
    try {
      const validData = URLDataSchema.parse(data);
      const urlData: Omit<PageData, 'id'> & { createdAt: FieldValue; updatedAt: FieldValue } = {
        ...validData,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        uid: context?.auth?.uid || '123',
        status: 'new',
        processed: { html: null },
      };
      // Push the new url into Cloud Firestore using the Firebase Admin SDK.
      return await firestore.collection('pages').add(urlData);
    } catch (e) {
      if (e instanceof zod.ZodError) {
        throw new functions.https.HttpsError(
          'invalid-argument',
          e.errors.map((e) => `${e.path.join('>')} - ${e.message}`).join(' ')
        );
      } else {
        throw new functions.https.HttpsError('unknown', e.message || 'Unknown error');
      }
    }
  }
);
