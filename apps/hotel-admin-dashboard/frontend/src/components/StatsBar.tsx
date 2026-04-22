import { useMemo } from 'react';
import type { Booking } from '../types';

interface StatsBarProps {
  bookings: Booking[];
}

function StatsBar({ bookings }: StatsBarProps) {
  const stats = useMemo(() => {
    const checkedIn = bookings.filter(b => b.status === 'checked-in').length;
    const pending = bookings.filter(b => b.status === 'pending').length;
    const revenue = bookings
      .filter(b => b.status !== 'cancelled')
      .reduce((sum, b) => sum + b.amount, 0);
    const occupancyRate = bookings.length
      ? Math.round((checkedIn / bookings.length) * 100)
      : 0;
    return { checkedIn, pending, revenue, occupancyRate };
  }, [bookings]);

  return (
    <div className="stats-bar">
      <div className="stat-card">
        <p className="stat-label">Checked In</p>
        <p className="stat-value">{stats.checkedIn}</p>
      </div>
      <div className="stat-card">
        <p className="stat-label">Pending</p>
        <p className="stat-value">{stats.pending}</p>
      </div>
      <div className="stat-card">
        <p className="stat-label">Occupancy</p>
        <p className="stat-value">{stats.occupancyRate}%</p>
      </div>
      <div className="stat-card">
        <p className="stat-label">Total Revenue</p>
        <p className="stat-value">${stats.revenue.toLocaleString()}</p>
      </div>
    </div>
  );
}

export default StatsBar;
