import { useState } from 'react';
import { useBookings } from './hooks/useBookings';
import StatsBar from './components/StatsBar';
import BookingsTable from './components/BookingsTable';
import AddBookingModal from './components/AddBookingModal';
import './App.css';

function App() {
  const { bookings, loading, error, clearError, addBooking, changeStatus, deleteBooking } = useBookings();
  const [showModal, setShowModal] = useState(false);

  const handleAdd = async (body: Parameters<typeof addBooking>[0]) => {
    await addBooking(body);
    setShowModal(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>Hotel Admin</h1>
            <p className="header-sub">Booking Management</p>
          </div>
          <button className="btn-primary" onClick={() => setShowModal(true)}>+ Add Booking</button>
        </div>
      </header>

      <main className="main-content">
        {error && (
          <div className="error-banner" role="alert">
            {error}
            <button onClick={clearError} aria-label="Dismiss">✕</button>
          </div>
        )}

        {loading ? (
          <div className="loading">Loading bookings...</div>
        ) : (
          <>
            <StatsBar bookings={bookings} />
            <div className="section-header">
              <h2>All Bookings</h2>
              <span className="booking-count">{bookings.length} total</span>
            </div>
            <BookingsTable
              bookings={bookings}
              onStatusChange={changeStatus}
              onDelete={deleteBooking}
            />
          </>
        )}
      </main>

      {showModal && (
        <AddBookingModal onAdd={handleAdd} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default App;
