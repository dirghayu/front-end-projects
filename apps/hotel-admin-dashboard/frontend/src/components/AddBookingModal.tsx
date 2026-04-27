import { useState } from 'react';
import type { CreateBookingBody } from '../types';

interface AddBookingModalProps {
  onAdd: (body: CreateBookingBody) => void;
  onClose: () => void;
}

const INITIAL: CreateBookingBody = {
  guestName: '', room: '', checkIn: '', checkOut: '', status: 'confirmed', amount: '',
};

function AddBookingModal({ onAdd, onClose }: AddBookingModalProps) {
  const [form, setForm] = useState<CreateBookingBody>(INITIAL);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.guestName || !form.room || !form.checkIn || !form.checkOut || !form.amount) return;
    onAdd(form);
    setForm(INITIAL);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <h2>Add Booking</h2>
        <form onSubmit={handleSubmit} className="booking-form">
          <label htmlFor="guestName">Guest Name</label>
          <input id="guestName" name="guestName" value={form.guestName} onChange={handleChange} placeholder="Full name" required />

          <label htmlFor="room">Room</label>
          <input id="room" name="room" value={form.room} onChange={handleChange} placeholder="e.g. 101" required />

          <div className="form-row">
            <div>
              <label htmlFor="checkIn">Check In</label>
              <input id="checkIn" name="checkIn" type="date" value={form.checkIn} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="checkOut">Check Out</label>
              <input id="checkOut" name="checkOut" type="date" value={form.checkOut} onChange={handleChange} required />
            </div>
          </div>

          <label htmlFor="amount">Amount ($)</label>
          <input id="amount" name="amount" type="number" min="0" step="0.01" value={form.amount} onChange={handleChange} placeholder="0.00" required />

          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={form.status} onChange={handleChange}>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="checked-in">Checked In</option>
            <option value="checked-out">Checked Out</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <button type="submit" className="btn-primary">Add Booking</button>
        </form>
      </div>
    </div>
  );
}

export default AddBookingModal;
