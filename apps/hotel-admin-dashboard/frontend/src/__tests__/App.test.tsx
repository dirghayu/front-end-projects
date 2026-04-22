import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import * as api from '../api/bookings';

vi.mock('../api/bookings');

beforeEach(() => {
  vi.mocked(api.fetchAll).mockResolvedValue([]);
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('App', () => {
  it('renders without crashing and logs no console errors', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<App />);

    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());

    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('shows stats bar after loading', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('Checked In')).toBeInTheDocument());
  });

  it('shows Add Booking button', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByRole('button', { name: /add booking/i })).toBeInTheDocument());
  });
});
