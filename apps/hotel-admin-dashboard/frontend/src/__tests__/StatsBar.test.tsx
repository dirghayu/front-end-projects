import { render, screen } from '@testing-library/react';
import StatsBar from '../components/StatsBar';
import type { Booking } from '../types';

const BOOKINGS: Booking[] = [
  { id: '1', guestName: 'Alice', room: '101', checkIn: '2026-04-20', checkOut: '2026-04-23', status: 'checked-in', amount: 450 },
  { id: '2', guestName: 'Bob', room: '202', checkIn: '2026-04-22', checkOut: '2026-04-25', status: 'confirmed', amount: 600 },
  { id: '3', guestName: 'Carol', room: '305', checkIn: '2026-04-25', checkOut: '2026-04-27', status: 'pending', amount: 320 },
  { id: '4', guestName: 'Dave', room: '110', checkIn: '2026-04-18', checkOut: '2026-04-22', status: 'cancelled', amount: 800 },
];

describe('StatsBar', () => {
  it('shows correct checked-in count next to label', () => {
    render(<StatsBar bookings={BOOKINGS} />);
    const label = screen.getByText('Checked In');
    expect(label.nextElementSibling?.textContent).toBe('1');
  });

  it('shows correct pending count next to label', () => {
    render(<StatsBar bookings={BOOKINGS} />);
    const label = screen.getByText('Pending');
    expect(label.nextElementSibling?.textContent).toBe('1');
  });

  it('excludes cancelled bookings from revenue', () => {
    render(<StatsBar bookings={BOOKINGS} />);
    expect(screen.getByText('$1,370')).toBeInTheDocument();
  });

  it('shows 0% occupancy with no bookings', () => {
    render(<StatsBar bookings={[]} />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('shows occupancy rate based on checked-in ratio', () => {
    render(<StatsBar bookings={BOOKINGS} />);
    // 1 checked-in out of 4 bookings = 25%
    expect(screen.getByText('25%')).toBeInTheDocument();
  });
});
