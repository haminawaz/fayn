import { Property } from '@/types';

export const mockFlats: Property[] = [
  {
    id: '1',
    name: 'Luxury Apartment 1A',
    type: 'flat',
    floor: 1,
    price: 500000,
    downPayment: 100000,
    duration: 3,
    frequency: 'Monthly',
    completed: 2,
    total: 36,
    overdue: 0,
    installments: [
      {
        id: '1',
        number: 1,
        amount: 11110,
        dueDate: '2024-08-19',
        paidDate: '2024-08-18',
        status: 'completed'
      },
      {
        id: '2',
        number: 2,
        amount: 11110,
        dueDate: '2024-09-19',
        paidDate: '2024-09-18',
        status: 'completed'
      },
      {
        id: '3',
        number: 3,
        amount: 11110,
        dueDate: '2024-10-19',
        status: 'pending'
      }
    ]
  },
  {
    id: '2',
    name: 'Premium Suite 2B',
    type: 'flat',
    floor: 2,
    price: 750000,
    downPayment: 150000,
    duration: 4,
    frequency: 'Monthly',
    completed: 8,
    total: 48,
    overdue: 5000,
    installments: []
  },
  {
    id: '3',
    name: 'Executive Floor 3C',
    type: 'flat',
    floor: 3,
    price: 600000,
    downPayment: 120000,
    duration: 2.5,
    frequency: 'Bi-Monthly',
    completed: 5,
    total: 15,
    overdue: 0,
    installments: []
  }
];

export const mockShops: Property[] = [
  {
    id: '4',
    name: 'Corner Coffee Shop',
    type: 'shop',
    price: 200000,
    downPayment: 40000,
    duration: 2,
    frequency: 'Monthly',
    completed: 12,
    total: 24,
    overdue: 0,
    installments: []
  },
  {
    id: '5',
    name: 'Fashion Boutique',
    type: 'shop',
    price: 150000,
    downPayment: 30000,
    duration: 1.5,
    frequency: 'Monthly',
    completed: 8,
    total: 18,
    overdue: 2500,
    installments: []
  },
  {
    id: '6',
    name: 'Electronics Store',
    type: 'shop',
    price: 300000,
    downPayment: 60000,
    duration: 3,
    frequency: 'Quarterly',
    completed: 4,
    total: 12,
    overdue: 0,
    installments: []
  }
];