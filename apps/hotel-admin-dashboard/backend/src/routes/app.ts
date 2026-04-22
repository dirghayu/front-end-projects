import express, { Request, Response } from 'express';
import cors from 'cors';
import { BookingRepository } from '../repository/BookingRepository';
import { Booking, CreateBookingBody, UpdateStatusBody, ErrorResponse } from '../types/Booking';

export function createApp(repo: BookingRepository) {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/bookings', async (_req: Request, res: Response) => {
    const bookings = await repo.getAll();
    res.json(bookings);
  });

  app.post(
    '/bookings',
    async (
      req: Request<Record<string, never>, Booking | ErrorResponse, CreateBookingBody>,
      res: Response
    ) => {
      const { guestName, room, checkIn, checkOut, status, amount } = req.body;
      if (!guestName || !room || !checkIn || !checkOut || !status || !amount) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }
      const booking = await repo.create({ guestName, room, checkIn, checkOut, status, amount });
      res.status(201).json(booking);
    }
  );

  app.patch(
    '/bookings/:id/status',
    async (
      req: Request<{ id: string }, Booking | ErrorResponse, UpdateStatusBody>,
      res: Response
    ) => {
      const { status } = req.body;
      if (!status) {
        res.status(400).json({ error: 'Missing status' });
        return;
      }
      const booking = await repo.updateStatus(req.params.id, status);
      if (!booking) {
        res.status(404).json({ error: 'Booking not found' });
        return;
      }
      res.json(booking);
    }
  );

  app.delete('/bookings/:id', async (req: Request<{ id: string }>, res: Response) => {
    const found = await repo.delete(req.params.id);
    if (!found) {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }
    res.status(204).send();
  });

  return app;
}
