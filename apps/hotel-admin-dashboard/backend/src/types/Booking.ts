export type BookingStatus = 'confirmed' | 'pending' | 'cancelled' | 'checked-in' | 'checked-out';

export interface Booking {
  id: string;
  guestName: string;
  room: string;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
  amount: number;
}

export interface CreateBookingBody {
  guestName: string;
  room: string;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
  amount: number | string;
}

export interface UpdateStatusBody {
  status: BookingStatus;
}

export interface ErrorResponse {
  error: string;
}
