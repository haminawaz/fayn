'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const recentFlats = [
  { name: 'Luxury Apartment 1A', floor: 1, price: '$500,000', status: 'Active' },
  { name: 'Premium Suite 2B', floor: 2, price: '$750,000', status: 'Active' },
  { name: 'Executive Floor 3C', floor: 3, price: '$600,000', status: 'Pending' },
];

const recentShops = [
  { name: 'Corner Coffee Shop', price: '$200,000', status: 'Active' },
  { name: 'Fashion Boutique', price: '$150,000', status: 'Active' },
  { name: 'Electronics Store', price: '$300,000', status: 'Pending' },
];

export default function RecentProperties() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Flats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentFlats.map((flat, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{flat.name}</p>
                  <p className="text-sm text-gray-600">Floor {flat.floor}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{flat.price}</p>
                  <Badge variant={flat.status === 'Active' ? 'default' : 'secondary'}>
                    {flat.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Shops</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentShops.map((shop, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{shop.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{shop.price}</p>
                  <Badge variant={shop.status === 'Active' ? 'default' : 'secondary'}>
                    {shop.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}