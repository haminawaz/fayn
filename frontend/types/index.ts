export interface Property {
  id: string;
  name: string;
  type: 'flat' | 'shop';
  floor?: number;
  price: number;
  downPayment: number;
  duration: number;
  frequency: string;
  completed: number;
  total: number;
  overdue: number;
  installments: Installment[];
}

export interface Installment {
  id: string;
  number: number;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: string;
}

export interface PropertyFormData {
  name: string;
  floor?: number;
  price: number;
  downPaymentPercentage: number;
  duration: number;
  frequency: string;
}