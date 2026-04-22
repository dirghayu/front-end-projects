import { Booking, CreateBookingBody, BookingStatus } from '../types/Booking';

export interface BookingRepository {
  getAll(): Promise<Booking[]>;
  create(body: CreateBookingBody): Promise<Booking>;
  updateStatus(id: string, status: BookingStatus): Promise<Booking | null>;
  delete(id: string): Promise<boolean>;
}
