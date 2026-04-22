import axios from 'axios';
import type { Booking, CreateBookingBody, BookingStatus } from '../types';

const BASE = '/bookings';

export async function fetchAll(): Promise<Booking[]> {
  const res = await axios.get<Booking[]>(BASE);
  return res.data;
}

export async function create(body: CreateBookingBody): Promise<Booking> {
  const res = await axios.post<Booking>(BASE, body);
  return res.data;
}

export async function updateStatus(id: string, status: BookingStatus): Promise<Booking> {
  const res = await axios.patch<Booking>(`${BASE}/${id}/status`, { status });
  return res.data;
}

export async function remove(id: string): Promise<void> {
  await axios.delete(`${BASE}/${id}`);
}
