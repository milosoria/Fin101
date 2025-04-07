import { Transaction } from '../../types';

export type TransactionFormProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
};

export type TransactionFormState = {
  amount: string;
  description: string;
  type: 'ingress' | 'egress';
  category: string;
}; 