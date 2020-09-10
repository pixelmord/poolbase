/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as functions from 'firebase-functions';
import { scrapeHTML } from '../processing';
import { firestore } from '../lib/initFirebaseAdmin';

import { firebaseDataToElasticData, elasticClient, elasticEngineName } from '../lib';

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
        const write = await firestore.collection('pages').doc(context.params.pageId).update(data);

        const response = await elasticClient.indexDocuments(elasticEngineName, [
          firebaseDataToElasticData({
            ...page,
            createdAt: write.writeTime.toDate().toISOString(),
            ...data,
            id: context.params.pageId,
          }),
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  });
