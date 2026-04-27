import { useState, useCallback, useRef } from 'react';
import { useBookings } from './hooks/useBookings';
import { useTableControls } from './hooks/useTableControls';
import StatsBar from './components/StatsBar';
import BookingsTable from './components/BookingsTable';
import AddBookingModal from './components/AddBookingModal';
import './App.css';

function App() {
  const { bookings, loading, error, clearError, addBooking, changeStatus, deleteBooking } = useBookings();
  const [showModal, setShowModal] = useState(false);

  const {
    search, handleSearch,
    sortKey, sortDir, handleSort,
    page, totalPages, setPage,
    filtered, paginated,
  } = useTableControls(bookings);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => handleSearch(val), 250);
  }, [handleSearch]);

  const handleAdd = async (body: Parameters<typeof addBooking>[0]) => {
    await addBooking(body);
    setShowModal(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-mark">
            <div className="logo-icon">🏨</div>
            <div>
              <h1>Hotel Admin</h1>
              <p className="header-sub">Management Portal</p>
            </div>
          </div>

          <nav className="nav-section">
            <p className="nav-label">Main</p>
            <div className="nav-item active">
              <span className="nav-item-icon">📋</span> Bookings
            </div>
            <div className="nav-item">
              <span className="nav-item-icon">🛏️</span> Rooms
            </div>
            <div className="nav-item">
              <span className="nav-item-icon">👥</span> Guests
            </div>
            <p className="nav-label" style={{ marginTop: '20px' }}>Reports</p>
            <div className="nav-item">
              <span className="nav-item-icon">📊</span> Analytics
            </div>
            <div className="nav-item">
              <span className="nav-item-icon">💰</span> Revenue
            </div>
          </nav>

          <div className="sidebar-footer">
            <button className="btn-primary" onClick={() => setShowModal(true)}>
              + New Booking
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <p className="page-title">Bookings</p>
        <p className="page-subtitle">Manage and track all hotel reservations</p>

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

            <div className="table-controls">
              <div className="section-header">
                <h2>All Bookings</h2>
                <span className="booking-count">{filtered.length} of {bookings.length}</span>
              </div>
              <input
                className="search-input"
                type="search"
                placeholder="Search guest or room..."
                defaultValue={search}
                onChange={onSearchChange}
                aria-label="Search bookings"
              />
            </div>

            <BookingsTable
              bookings={paginated}
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={handleSort}
              onStatusChange={changeStatus}
              onDelete={deleteBooking}
            />

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="page-btn"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  ← Prev
                </button>
                <span className="page-info">Page {page} of {totalPages}</span>
                <button
                  className="page-btn"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next →
                </button>
              </div>
            )}
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
