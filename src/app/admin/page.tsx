'use client';
import React from 'react';
import Link from 'next/link';

const AdminSidebar: React.FC = () => {
  return (
    <nav className="w-1/4 bg-gray-800 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <ul>
        <li className="mb-4">
          <Link href="/admin/users">
            <div className="block py-2 px-4 hover:bg-grdivy-700 rounded">
              User Management
            </div>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/products">
            <div className="block py-2 px-4 hover:bg-gray-700 rounded">
              Product Management
            </div>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/orders">
            <div className="block py-2 px-4 hover:bg-gray-700 rounded">
              Order Management
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminSidebar;
