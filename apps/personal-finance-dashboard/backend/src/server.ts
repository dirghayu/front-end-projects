import { createApp } from './app';
import { InMemoryRepository } from './InMemoryRepository';

const port = process.env.PORT || 3001;

// Local dev always uses in-memory store.
// For Firestore locally, run: npx firebase emulators:start
// and use the Functions emulator which uses FirestoreRepository via index.ts.
const repo = new InMemoryRepository();
const app = createApp(repo);

app.listen(port, () => {
  console.log(`Server running on port ${port} (in-memory store)`);
});
