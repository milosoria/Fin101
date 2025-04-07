export enum TransactionType {
  INGRESS = 'ingress',
  EGRESS = 'egress'
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: {
    id: string;
    name: string;
    icon: string;
  };
  bank: {
    id: string;
    name: string;
    color: string;
  };
  date: Date;
  description?: string;
}

export interface Bank {
  id: string;
  name: string;
  balance: number;
  color: string;
  icon?: string;
}

export interface MonthlyBudget {
  amount: number;
  startDate: Date;
  endDate: Date;
  spent: number;
  remaining: number;
} 