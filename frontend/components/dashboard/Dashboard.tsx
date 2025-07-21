'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import DashboardContent from '@/components/dashboard/DashboardContent';
import FlatsPage from '@/components/flats/FlatsPage';
import ShopsPage from '@/components/shops/ShopsPage';
import AddFlatPage from '@/components/flats/AddFlatPage';
import AddShopPage from '@/components/shops/AddShopPage';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardContent />;
      case 'flats':
        return <FlatsPage onAddFlat={() => setCurrentPage('add-flat')} />;
      case 'shops':
        return <ShopsPage onAddShop={() => setCurrentPage('add-shop')} />;
      case 'add-flat':
        return <AddFlatPage onBack={() => setCurrentPage('flats')} />;
      case 'add-shop':
        return <AddShopPage onBack={() => setCurrentPage('shops')} />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}