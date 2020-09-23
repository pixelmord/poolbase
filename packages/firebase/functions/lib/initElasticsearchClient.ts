/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as functions from 'firebase-functions';
import AppSearchClient from '@elastic/app-search-node';
const apiKey = functions.config().elastic.api_key;
export const elasticEngineName = functions.config().elastic.engine;
const baseUrlFn = () => functions.config().elastic.base_url as string;
export const elasticClient = new AppSearchClient(undefined, apiKey, baseUrlFn);
