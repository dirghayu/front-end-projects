import { createApp } from './routes/app';
import { InMemoryRepository } from './repository/InMemoryRepository';

const port = process.env.PORT || 3002;

const repo = new InMemoryRepository();
const app = createApp(repo);

app.listen(port, () => {
  console.log(`Hotel admin backend running on port ${port} (in-memory store)`);
});
