import { useState, useEffect, useCallback } from 'react';
import type { Booking, CreateBookingBody, BookingStatus } from '../types';
import * as api from '../api/bookings';

interface UseBookingsResult {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  clearError: () => void;
  addBooking: (body: CreateBookingBody) => Promise<void>;
  changeStatus: (id: string, status: BookingStatus) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
}

export function useBookings(): UseBookingsResult {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    api.fetchAll()
      .then(data => { if (!cancelled) setBookings(data); })
      .catch(() => { if (!cancelled) setError('Failed to load bookings. Is the backend running?'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const addBooking = useCallback(async (body: CreateBookingBody) => {
    try {
      const created = await api.create(body);
      setBookings(prev => [created, ...prev]);
    } catch {
      setError('Failed to add booking.');
    }
  }, []);

  const changeStatus = useCallback(async (id: string, status: BookingStatus) => {
    try {
      const updated = await api.updateStatus(id, status);
      setBookings(prev => prev.map(b => b.id === id ? updated : b));
    } catch {
      setError('Failed to update status.');
    }
  }, []);

  const deleteBooking = useCallback(async (id: string) => {
    try {
      await api.remove(id);
      setBookings(prev => prev.filter(b => b.id !== id));
    } catch {
      setError('Failed to delete booking.');
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { bookings, loading, error, clearError, addBooking, changeStatus, deleteBooking };
}
