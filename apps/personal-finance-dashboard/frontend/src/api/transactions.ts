import axios from 'axios';
import { Transaction, CreateTransactionBody } from '../types';

const BASE = '/transactions';

export async function fetchAll(): Promise<Transaction[]> {
  const res = await axios.get<Transaction[]>(BASE);
  return res.data;
}

export async function create(body: CreateTransactionBody): Promise<Transaction> {
  const res = await axios.post<Transaction>(BASE, body);
  return res.data;
}

export async function remove(id: string): Promise<void> {
  await axios.delete(`${BASE}/${id}`);
}
