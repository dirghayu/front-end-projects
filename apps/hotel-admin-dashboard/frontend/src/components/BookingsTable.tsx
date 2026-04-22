import type { Booking, BookingStatus } from '../types';

const STATUS_COLORS: Record<BookingStatus, string> = {
  'confirmed':   'status--confirmed',
  'pending':     'status--pending',
  'cancelled':   'status--cancelled',
  'checked-in':  'status--checked-in',
  'checked-out': 'status--checked-out',
};

const STATUSES: BookingStatus[] = ['confirmed', 'pending', 'cancelled', 'checked-in', 'checked-out'];

interface BookingsTableProps {
  bookings: Booking[];
  onStatusChange: (id: string, status: BookingStatus) => void;
  onDelete: (id: string) => void;
}

function BookingsTable({ bookings, onStatusChange, onDelete }: BookingsTableProps) {
  if (bookings.length === 0) {
    return <p className="empty-state">No bookings found.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="bookings-table">
        <thead>
          <tr>
            <th>Guest</th>
            <th>Room</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id}>
              <td>{booking.guestName}</td>
              <td>{booking.room}</td>
              <td>{booking.checkIn}</td>
              <td>{booking.checkOut}</td>
              <td>${booking.amount.toLocaleString()}</td>
              <td>
                <select
                  className={`status-badge ${STATUS_COLORS[booking.status]}`}
                  value={booking.status}
                  onChange={e => onStatusChange(booking.id, e.target.value as BookingStatus)}
                  aria-label={`Status for ${booking.guestName}`}
                >
                  {STATUSES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </td>
              <td>
                <button
                  className="btn-delete"
                  onClick={() => onDelete(booking.id)}
                  aria-label={`Delete booking for ${booking.guestName}`}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookingsTable;
