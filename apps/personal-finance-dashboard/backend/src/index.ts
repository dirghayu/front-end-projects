import * as admin from 'firebase-admin';
import { onRequest } from 'firebase-functions/v2/https';
import { createApp } from './routes/app';
import { FirestoreRepository } from './repository/FirestoreRepository';

admin.initializeApp();

const repo = new FirestoreRepository();
const app = createApp(repo);

export const api = onRequest({ region: 'australia-southeast1', invoker: 'public' }, app);
