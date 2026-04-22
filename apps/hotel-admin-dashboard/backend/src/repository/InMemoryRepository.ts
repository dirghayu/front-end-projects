import { BookingRepository } from './BookingRepository';
import { Booking, CreateBookingBody, BookingStatus } from '../types/Booking';

let idCounter = 7;

const SEED: Booking[] = [
  { id: '1', guestName: 'Alice Johnson',  room: '101', checkIn: '2026-04-20', checkOut: '2026-04-23', status: 'checked-in',  amount: 450 },
  { id: '2', guestName: 'Bob Smith',      room: '202', checkIn: '2026-04-22', checkOut: '2026-04-25', status: 'confirmed',   amount: 600 },
  { id: '3', guestName: 'Carol White',    room: '305', checkIn: '2026-04-25', checkOut: '2026-04-27', status: 'pending',     amount: 320 },
  { id: '4', guestName: 'David Lee',      room: '110', checkIn: '2026-04-18', checkOut: '2026-04-22', status: 'checked-out', amount: 800 },
  { id: '5', guestName: 'Emma Davis',     room: '204', checkIn: '2026-04-23', checkOut: '2026-04-26', status: 'confirmed',   amount: 540 },
  { id: '6', guestName: 'Frank Wilson',   room: '401', checkIn: '2026-04-21', checkOut: '2026-04-22', status: 'cancelled',   amount: 150 },
];

export class InMemoryRepository implements BookingRepository {
  private bookings: Booking[];

  constructor() {
    this.bookings = SEED.map(b => ({ ...b }));
  }

  async getAll(): Promise<Booking[]> {
    return [...this.bookings];
  }

  async create(body: CreateBookingBody): Promise<Booking> {
    const booking: Booking = {
      id: String(idCounter++),
      guestName: body.guestName,
      room: body.room,
      checkIn: body.checkIn,
      checkOut: body.checkOut,
      status: body.status,
      amount: parseFloat(String(body.amount)),
    };
    this.bookings.push(booking);
    return booking;
  }

  async updateStatus(id: string, status: BookingStatus): Promise<Booking | null> {
    const booking = this.bookings.find(b => b.id === id);
    if (!booking) return null;
    booking.status = status;
    return { ...booking };
  }

  async delete(id: string): Promise<boolean> {
    const index = this.bookings.findIndex(b => b.id === id);
    if (index === -1) return false;
    this.bookings.splice(index, 1);
    return true;
  }
}
