'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import PropertyForm from '@/components/shared/PropertyForm';
import { PropertyFormData } from '@/types';
import { toast } from 'sonner';

interface AddShopPageProps {
  onBack: () => void;
}

export default function AddShopPage({ onBack }: AddShopPageProps) {
  const handleSubmit = (data: PropertyFormData) => {
    console.log('Adding shop:', data);
    toast.success('Shop added successfully!');
    onBack();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Shop</h1>
          <p className="text-gray-600">Create a new shop property</p>
        </div>
      </div>

      <PropertyForm 
        type="shop" 
        onSubmit={handleSubmit}
        onCancel={onBack}
      />
    </div>
  );
}