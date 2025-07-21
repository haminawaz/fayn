'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PropertyFormData } from '@/types';
import { calculateInstallmentAmount, formatCurrency } from '@/utils/calculations';

interface PropertyFormProps {
  type: 'flat' | 'shop';
  onSubmit: (data: PropertyFormData) => void;
  onCancel: () => void;
}

const durationOptions = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
const frequencyOptions = [
  { value: 'Monthly', label: 'Monthly' },
  { value: 'Bi-Monthly', label: 'Bi-Monthly (Every 2 months)' },
  { value: 'Quarterly', label: 'Quarterly (Every 3 months)' },
  { value: 'Semi-Annually', label: 'Semi-Annually (Every 6 months)' },
];

export default function PropertyForm({ type, onSubmit, onCancel }: PropertyFormProps) {
  const [formData, setFormData] = useState<PropertyFormData>({
    name: '',
    floor: type === 'flat' ? 1 : undefined,
    price: 0,
    downPaymentPercentage: 20,
    duration: 3,
    frequency: 'Monthly'
  });

  const [installmentPreview, setInstallmentPreview] = useState<number>(0);

  useEffect(() => {
    if (formData.price > 0) {
      const amount = calculateInstallmentAmount(
        formData.price,
        formData.downPaymentPercentage,
        formData.duration,
        formData.frequency
      );
      setInstallmentPreview(amount);
    }
  }, [formData.price, formData.downPaymentPercentage, formData.duration, formData.frequency]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const adjustPrice = (adjustment: number) => {
    const newPrice = Math.max(0, formData.price + adjustment);
    // Round to nearest 10 to end with 0
    const roundedPrice = Math.round(newPrice / 10) * 10;
    setFormData(prev => ({ ...prev, price: roundedPrice }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{type === 'flat' ? 'Flat' : 'Shop'} Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder={`Enter ${type} name`}
                required
              />
            </div>

            {type === 'flat' && (
              <div className="space-y-2">
                <Label htmlFor="floor">Floor Number</Label>
                <Input
                  id="floor"
                  type="number"
                  min="1"
                  value={formData.floor || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, floor: parseInt(e.target.value) }))}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="price"
                  type="number"
                  step="10"
                  value={formData.price || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                  placeholder="Enter price"
                  required
                />
                <div className="flex flex-col space-y-1">
                  <Button type="button" size="sm" variant="outline" onClick={() => adjustPrice(10)}>+</Button>
                  <Button type="button" size="sm" variant="outline" onClick={() => adjustPrice(-10)}>-</Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="downPayment">Down Payment (%)</Label>
              <Input
                id="downPayment"
                type="number"
                min="0"
                max="100"
                value={formData.downPaymentPercentage}
                onChange={(e) => setFormData(prev => ({ ...prev, downPaymentPercentage: parseInt(e.target.value) }))}
                required
              />
              <p className="text-sm text-gray-600">
                Amount: {formatCurrency((formData.price * formData.downPaymentPercentage) / 100)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (Years)</Label>
              <Select
                value={formData.duration.toString()}
                onValueChange={(value) => setFormData(prev => ({ ...prev, duration: parseFloat(value) }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map((duration) => (
                    <SelectItem key={duration} value={duration.toString()}>
                      {duration} Year{duration !== 1 ? 's' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">Payment Frequency</Label>
              <Select
                value={formData.frequency}
                onValueChange={(value) => setFormData(prev => ({ ...prev, frequency: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {frequencyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {installmentPreview > 0 && (
              <div className="p-4 bg-indigo-50 rounded-lg">
                <h4 className="font-medium text-indigo-900 mb-2">Installment Preview</h4>
                <p className="text-2xl font-bold text-indigo-600">
                  {formatCurrency(installmentPreview)}
                </p>
                <p className="text-sm text-indigo-700">per {formData.frequency.toLowerCase()} payment</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
          Add {type === 'flat' ? 'Flat' : 'Shop'}
        </Button>
      </div>
    </form>
  );
}