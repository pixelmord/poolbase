/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as functions from 'firebase-functions';
import { scrapeHTML } from '../processing';
import admin, { firestore } from '../lib/initFirebaseAdmin';

export const pageCreateHandler = functions
  .region('europe-west1')
  .runWith({
    timeoutSeconds: 540,
    memory: '1GB',
  })
  .firestore.document('pages/{pageId}')
  .onCreate(async (snapshot, context) => {
    const page = snapshot.data();
    try {
      if (typeof page !== 'undefined' && typeof page.url !== 'undefined') {
        const data = await scrapeHTML(page.url, context.params.pageId);
        await firestore
          .collection('pages')
          .doc(context.params.pageId)
          .update({ ...data, updatedAt: admin.firestore.FieldValue.serverTimestamp() });
      }
    } catch (e) {
      console.log(e);
    }
  });
