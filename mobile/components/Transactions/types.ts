import { Transaction, TransactionType } from '../../types';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 1500,
    type: TransactionType.INGRESS,
    category: {
      id: 'salary',
      name: 'Salary',
      icon: '💰'
    },
    bank: {
      id: 'chase',
      name: 'Chase',
      color: '#1A73E8'
    },
    date: new Date(),
    description: 'Monthly salary'
  },
  {
    id: '2',
    amount: -50,
    type: TransactionType.EGRESS,
    category: {
      id: 'food',
      name: 'Food',
      icon: '🍔'
    },
    bank: {
      id: 'chase',
      name: 'Chase',
      color: '#1A73E8'
    },
    date: new Date(),
    description: 'Lunch at Chipotle'
  },
  {
    id: '3',
    amount: -200,
    type: TransactionType.EGRESS,
    category: {
      id: 'shopping',
      name: 'Shopping',
      icon: '🛍️'
    },
    bank: {
      id: 'boa',
      name: 'Bank of America',
      color: '#DB0F27'
    },
    date: new Date(),
    description: 'New clothes'
  }
];

export const mockBudget = {
  amount: 5000,
  startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  spent: 2500,
  remaining: 2500
};

export const mockTotalBalance = 10000; 