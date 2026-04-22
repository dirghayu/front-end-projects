import request from 'supertest';
import { createApp } from '../app';
import { InMemoryRepository } from '../InMemoryRepository';

// Fresh repository per test — same isolation as before, now via DI
// (equivalent to Spring @BeforeEach creating a new service with a fresh mock repository)
const getApp = () => createApp(new InMemoryRepository());

describe('GET /transactions', () => {
  it('returns the seeded transactions', async () => {
    const res = await request(getApp()).get('/transactions');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(3);
  });

  it('returns transactions with the correct shape', async () => {
    const res = await request(getApp()).get('/transactions');
    const first = res.body[0];

    expect(first).toMatchObject({
      id: expect.any(String),
      type: expect.stringMatching(/^(income|expense)$/),
      amount: expect.any(Number),
      category: expect.any(String),
      date: expect.any(String),
    });
  });
});

describe('POST /transactions', () => {
  it('creates a new transaction and returns 201', async () => {
    const body = { type: 'income', amount: 1000, category: 'Freelance', date: '2024-03-01' };
    const res = await request(getApp()).post('/transactions').send(body);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: expect.any(String),
      type: 'income',
      amount: 1000,
      category: 'Freelance',
      date: '2024-03-01',
    });
  });

  it('parses amount as a float', async () => {
    const body = { type: 'expense', amount: '99.99', category: 'Food', date: '2024-03-01' };
    const res = await request(getApp()).post('/transactions').send(body);

    expect(res.body.amount).toBe(99.99);
  });

  it('returns 400 when required fields are missing', async () => {
    const res = await request(getApp()).post('/transactions').send({ type: 'income' });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Missing required fields' });
  });

  it('returns 400 when body is empty', async () => {
    const res = await request(getApp()).post('/transactions').send({});

    expect(res.status).toBe(400);
  });
});

describe('DELETE /transactions/:id', () => {
  it('removes the transaction and returns 204', async () => {
    const app = getApp();
    const deleteRes = await request(app).delete('/transactions/1');
    expect(deleteRes.status).toBe(204);

    const listRes = await request(app).get('/transactions');
    const ids = listRes.body.map((t: { id: string }) => t.id);
    expect(ids).not.toContain('1');
  });

  it('returns 404 for a non-existent id', async () => {
    const res = await request(getApp()).delete('/transactions/9999');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Transaction not found' });
  });

  it('does not affect other transactions', async () => {
    const app = getApp();
    await request(app).delete('/transactions/2');

    const listRes = await request(app).get('/transactions');
    const ids = listRes.body.map((t: { id: string }) => t.id);
    expect(ids).toContain('1');
    expect(ids).toContain('3');
    expect(ids).not.toContain('2');
  });
});
