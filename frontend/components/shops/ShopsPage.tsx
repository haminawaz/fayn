'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import PropertyList from '@/components/shared/PropertyList';
import { mockShops } from '@/utils/mockData';

interface ShopsPageProps {
  onAddShop: () => void;
}

export default function ShopsPage({ onAddShop }: ShopsPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shops</h1>
          <p className="text-gray-600">Manage your shop properties</p>
        </div>
        <Button 
          onClick={onAddShop}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Shop
        </Button>
      </div>

      <PropertyList properties={mockShops} type="shop" />
    </div>
  );
}