'use client';
import React from 'react';
import AdminSidebar from './AdminSidebar';
import SimpleLineChart from './SimpleLineChart';
import OrderStatusChart from './OrderStatusChart';

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-yellow-500">Welcome to the Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <OrderStatusChart />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <SimpleLineChart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
