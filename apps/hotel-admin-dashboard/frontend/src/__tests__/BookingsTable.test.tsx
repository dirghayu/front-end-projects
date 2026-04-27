import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import BookingsTable from '../components/BookingsTable';
import type { Booking } from '../types';

const onStatusChange = vi.fn();
const onDelete = vi.fn();
const onSort = vi.fn();

const BOOKINGS: Booking[] = [
  { id: '1', guestName: 'Alice Johnson', room: '101', checkIn: '2026-04-20', checkOut: '2026-04-23', status: 'checked-in', amount: 450 },
  { id: '2', guestName: 'Bob Smith', room: '202', checkIn: '2026-04-22', checkOut: '2026-04-25', status: 'confirmed', amount: 600 },
];

beforeEach(() => { onStatusChange.mockClear(); onDelete.mockClear(); onSort.mockClear(); });

describe('BookingsTable', () => {
  it('renders empty state when no bookings', () => {
    render(<BookingsTable bookings={[]} sortKey="checkIn" sortDir="asc" onSort={onSort} onStatusChange={onStatusChange} onDelete={onDelete} />);
    expect(screen.getByText(/no bookings found/i)).toBeInTheDocument();
  });

  it('renders all bookings', () => {
    render(<BookingsTable bookings={BOOKINGS} sortKey="checkIn" sortDir="asc" onSort={onSort} onStatusChange={onStatusChange} onDelete={onDelete} />);
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
  });

  it('calls onDelete with correct id', async () => {
    const user = userEvent.setup();
    render(<BookingsTable bookings={BOOKINGS} sortKey="checkIn" sortDir="asc" onSort={onSort} onStatusChange={onStatusChange} onDelete={onDelete} />);
    await user.click(screen.getByRole('button', { name: /delete booking for alice/i }));
    expect(onDelete).toHaveBeenCalledWith('1');
  });

  it('calls onStatusChange when status is changed', async () => {
    const user = userEvent.setup();
    render(<BookingsTable bookings={BOOKINGS} sortKey="checkIn" sortDir="asc" onSort={onSort} onStatusChange={onStatusChange} onDelete={onDelete} />);
    await user.selectOptions(screen.getByRole('combobox', { name: /status for alice/i }), 'cancelled');
    expect(onStatusChange).toHaveBeenCalledWith('1', 'cancelled');
  });

  it('formats amounts correctly', () => {
    render(<BookingsTable bookings={BOOKINGS} sortKey="checkIn" sortDir="asc" onSort={onSort} onStatusChange={onStatusChange} onDelete={onDelete} />);
    expect(screen.getByText('$450')).toBeInTheDocument();
  });
});
