import request from 'supertest';
import { createApp } from '../routes/app';
import { InMemoryRepository } from '../repository/InMemoryRepository';

const getApp = () => createApp(new InMemoryRepository());

describe('GET /bookings', () => {
  it('returns all seeded bookings', async () => {
    const res = await request(getApp()).get('/bookings');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(6);
  });

  it('returns bookings with correct shape', async () => {
    const res = await request(getApp()).get('/bookings');
    const first = res.body[0];
    expect(first).toMatchObject({
      id: expect.any(String),
      guestName: expect.any(String),
      room: expect.any(String),
      checkIn: expect.any(String),
      checkOut: expect.any(String),
      status: expect.stringMatching(/^(confirmed|pending|cancelled|checked-in|checked-out)$/),
      amount: expect.any(Number),
    });
  });
});

describe('POST /bookings', () => {
  it('creates a booking and returns 201', async () => {
    const body = { guestName: 'Test Guest', room: '501', checkIn: '2026-05-01', checkOut: '2026-05-03', status: 'confirmed', amount: 400 };
    const res = await request(getApp()).post('/bookings').send(body);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: expect.any(String), guestName: 'Test Guest', room: '501' });
  });

  it('returns 400 when required fields are missing', async () => {
    const res = await request(getApp()).post('/bookings').send({ guestName: 'Test' });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Missing required fields' });
  });
});

describe('PATCH /bookings/:id/status', () => {
  it('updates the status and returns the booking', async () => {
    const res = await request(getApp()).patch('/bookings/1/status').send({ status: 'checked-out' });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('checked-out');
  });

  it('returns 404 for non-existent booking', async () => {
    const res = await request(getApp()).patch('/bookings/9999/status').send({ status: 'cancelled' });
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Booking not found' });
  });

  it('returns 400 when status is missing', async () => {
    const res = await request(getApp()).patch('/bookings/1/status').send({});
    expect(res.status).toBe(400);
  });
});

describe('DELETE /bookings/:id', () => {
  it('removes the booking and returns 204', async () => {
    const app = getApp();
    const deleteRes = await request(app).delete('/bookings/1');
    expect(deleteRes.status).toBe(204);

    const listRes = await request(app).get('/bookings');
    const ids = listRes.body.map((b: { id: string }) => b.id);
    expect(ids).not.toContain('1');
  });

  it('returns 404 for non-existent booking', async () => {
    const res = await request(getApp()).delete('/bookings/9999');
    expect(res.status).toBe(404);
  });

  it('does not affect other bookings', async () => {
    const app = getApp();
    await request(app).delete('/bookings/2');
    const listRes = await request(app).get('/bookings');
    const ids = listRes.body.map((b: { id: string }) => b.id);
    expect(ids).toContain('1');
    expect(ids).toContain('3');
    expect(ids).not.toContain('2');
  });
});
