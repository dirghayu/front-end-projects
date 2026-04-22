import * as admin from 'firebase-admin';
import { TransactionRepository } from './repository';
import { Transaction, CreateTransactionBody } from './types';

export class FirestoreRepository implements TransactionRepository {
  private col = admin.firestore().collection('transactions');

  async getAll(): Promise<Transaction[]> {
    const snapshot = await this.col.orderBy('date', 'desc').get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Transaction, 'id'>),
    }));
  }

  async create(body: CreateTransactionBody): Promise<Transaction> {
    const data = {
      type: body.type,
      amount: parseFloat(String(body.amount)),
      category: body.category,
      date: body.date,
    };
    const ref = await this.col.add(data);
    return { id: ref.id, ...data };
  }

  async delete(id: string): Promise<boolean> {
    const ref = this.col.doc(id);
    const doc = await ref.get();
    if (!doc.exists) return false;
    await ref.delete();
    return true;
  }
}
