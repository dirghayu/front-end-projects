import { renderHook, act } from '@testing-library/react';
import { useTableControls } from '../hooks/useTableControls';
import type { Booking } from '../types';

const BOOKINGS: Booking[] = [
  { id: '1', guestName: 'Alice Johnson', room: '101', checkIn: '2026-04-20', checkOut: '2026-04-23', status: 'checked-in', amount: 450 },
  { id: '2', guestName: 'Bob Smith',     room: '202', checkIn: '2026-04-22', checkOut: '2026-04-25', status: 'confirmed',  amount: 600 },
  { id: '3', guestName: 'Carol White',   room: '305', checkIn: '2026-04-25', checkOut: '2026-04-27', status: 'pending',    amount: 320 },
  { id: '4', guestName: 'David Lee',     room: '110', checkIn: '2026-04-18', checkOut: '2026-04-22', status: 'confirmed',  amount: 800 },
  { id: '5', guestName: 'Emma Davis',    room: '204', checkIn: '2026-04-23', checkOut: '2026-04-26', status: 'confirmed',  amount: 540 },
  { id: '6', guestName: 'Frank Wilson',  room: '401', checkIn: '2026-04-21', checkOut: '2026-04-22', status: 'cancelled',  amount: 150 },
];

describe('useTableControls', () => {
  it('returns all bookings on initial render', () => {
    const { result } = renderHook(() => useTableControls(BOOKINGS));
    expect(result.current.filtered).toHaveLength(6);
  });

  it('filters by guest name', () => {
    const { result } = renderHook(() => useTableControls(BOOKINGS));
    act(() => result.current.handleSearch('alice'));
    expect(result.current.filtered).toHaveLength(1);
    expect(result.current.filtered[0].guestName).toBe('Alice Johnson');
  });

  it('filters by room', () => {
    const { result } = renderHook(() => useTableControls(BOOKINGS));
    act(() => result.current.handleSearch('202'));
    expect(result.current.filtered).toHaveLength(1);
    expect(result.current.filtered[0].room).toBe('202');
  });

  it('resets to page 1 when searching', () => {
    const { result } = renderHook(() => useTableControls(BOOKINGS));
    act(() => result.current.setPage(2));
    act(() => result.current.handleSearch('alice'));
    expect(result.current.page).toBe(1);
  });

  it('sorts by amount ascending', () => {
    const { result } = renderHook(() => useTableControls(BOOKINGS));
    act(() => result.current.handleSort('amount'));
    const amounts = result.current.paginated.map(b => b.amount);
    expect(amounts).toEqual([...amounts].sort((a, b) => a - b));
  });

  it('toggles sort direction on second click', () => {
    const { result } = renderHook(() => useTableControls(BOOKINGS));
    act(() => result.current.handleSort('amount'));
    act(() => result.current.handleSort('amount'));
    expect(result.current.sortDir).toBe('desc');
  });

  it('paginates to 5 items per page', () => {
    const { result } = renderHook(() => useTableControls(BOOKINGS));
    expect(result.current.paginated).toHaveLength(5);
    expect(result.current.totalPages).toBe(2);
  });

  it('shows remaining items on page 2', () => {
    const { result } = renderHook(() => useTableControls(BOOKINGS));
    act(() => result.current.setPage(2));
    expect(result.current.paginated).toHaveLength(1);
  });
});
