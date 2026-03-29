export interface TransactionItemType {
  id: string;
  type: 'debit' | 'credit';
  title: string;
  time: string;
  amount: number;
  icon: string;
}