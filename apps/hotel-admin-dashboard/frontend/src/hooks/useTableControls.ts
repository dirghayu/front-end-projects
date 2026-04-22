import { useState, useMemo, useCallback } from 'react';
import type { Booking } from '../types';

export type SortKey = 'guestName' | 'checkIn' | 'amount';
export type SortDir = 'asc' | 'desc';

const PAGE_SIZE = 5;

export function useTableControls(bookings: Booking[]) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('checkIn');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [page, setPage] = useState(1);

  const handleSort = useCallback((key: SortKey) => {
    setSortKey(prev => {
      if (prev === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
      else { setSortDir('asc'); }
      return key;
    });
    setPage(1);
  }, []);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return bookings.filter(b =>
      b.guestName.toLowerCase().includes(q) ||
      b.room.toLowerCase().includes(q)
    );
  }, [bookings, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'amount') cmp = a.amount - b.amount;
      else cmp = a[sortKey].localeCompare(b[sortKey]);
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return sorted.slice(start, start + PAGE_SIZE);
  }, [sorted, safePage]);

  return {
    search, handleSearch,
    sortKey, sortDir, handleSort,
    page: safePage, totalPages, setPage,
    filtered, paginated,
  };
}
