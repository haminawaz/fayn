'use client';

import StatsCards from '@/components/dashboard/StatsCards';
import InstallmentCards from '@/components/dashboard/InstallmentCards';
import RecentProperties from '@/components/dashboard/RecentProperties';

export default function DashboardContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to Fayn property management system</p>
      </div>

      <StatsCards />
      <InstallmentCards />
      <RecentProperties />
    </div>
  );
}