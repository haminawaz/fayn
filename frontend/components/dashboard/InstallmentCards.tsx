'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const installmentStats = [
  {
    title: 'Pending Installments',
    value: '156',
    icon: Clock,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-gray-200'
  },
  {
    title: 'Overdue Installments',
    value: '23',
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  {
    title: 'Completed Installments',
    value: '1,061',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-gray-200'
  }
];

export default function InstallmentCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {installmentStats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className={`${stat.borderColor} border-2`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-full`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}