import { createApp } from './routes/app';
import { InMemoryRepository } from './repository/InMemoryRepository';

const port = process.env.PORT || 3001;

const repo = new InMemoryRepository();
const app = createApp(repo);

app.listen(port, () => {
  console.log(`Server running on port ${port} (in-memory store)`);
});
