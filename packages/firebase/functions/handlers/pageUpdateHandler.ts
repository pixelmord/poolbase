/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as functions from 'firebase-functions';

import { firebaseDataToElasticData, elasticClient, elasticEngineName } from '../lib';

export const pageUpdateHandler = functions
  .region('europe-west1')
  .runWith({
    timeoutSeconds: 540,
  })
  .firestore.document('pages/{pageId}')
  .onUpdate(async (change, context) => {
    const page = change.after.data();
    try {
      if (typeof page !== 'undefined') {
        const response = await elasticClient.updateDocuments(elasticEngineName, [
          firebaseDataToElasticData({ ...page, id: context.params.pageId }),
        ]);

        console.log(response);
      }
    } catch (e) {
      console.log(e);
    }
  });
