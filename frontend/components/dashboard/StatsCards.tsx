'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, CreditCard, TrendingUp } from 'lucide-react';

const stats = [
  {
    title: 'Total Flats',
    value: '48',
    icon: Building,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    title: 'Total Installments',
    value: '1,240',
    icon: CreditCard,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    title: 'Total Revenue',
    value: '$2.4M',
    icon: TrendingUp,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  }
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
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