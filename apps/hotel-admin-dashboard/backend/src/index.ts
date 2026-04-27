import * as functions from 'firebase-functions';
import { createApp } from './routes/app';
import { InMemoryRepository } from './repository/InMemoryRepository';

const repo = new InMemoryRepository();
const app = createApp(repo);

export const api = functions.https.onRequest(app);
