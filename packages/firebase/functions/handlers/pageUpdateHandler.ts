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
    const pageId: string = context.params.pageId;
    try {
      if (typeof page !== 'undefined') {
        const response = await elasticClient.indexDocuments(elasticEngineName, [
          firebaseDataToElasticData({ ...page, id: pageId, type: 'pages' }),
        ]);

        functions.logger.info(`Updated Page ${pageId} saved to elasticsearch`, response);
      }
    } catch (e) {
      console.error(e);
    }
  });
