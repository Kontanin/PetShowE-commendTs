'use client';
import React from 'react';
import Link from 'next/link';

const AdminSidebar: React.FC = () => {
  return (
    <nav className="w-1/4 bg-yellow-500 text-black p-6 shadow-lg">
      <ul>
        <li className="mb-4">
          <Link href="/admin/users">
            <div className="py-2 px-4 hover:bg-yellow-600 rounded transition duration-200">
              <h2 className="text-lg font-semibold">User Management</h2>
              <p className="text-sm">Manage all users from this section.</p>
            </div>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/products">
            <div className="py-2 px-4 hover:bg-yellow-600 rounded transition duration-200">
              <h2 className="text-lg font-semibold">Product Management</h2>
              <p className="text-sm">Manage all products from this section.</p>
            </div>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/orders">
            <div className="py-2 px-4 hover:bg-yellow-600 rounded transition duration-200">
              <h2 className="text-lg font-semibold">Order Management</h2>
              <p className="text-sm">Manage all orders from this section.</p>
            </div>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/promotions">
            <div className="py-2 px-4 hover:bg-yellow-600 rounded transition duration-200">
              <h2 className="text-lg font-semibold">Promotion</h2>
              <p className="text-sm">Manage all Promotion campaigns</p>
            </div>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/blogs">
            <div className="py-2 px-4 hover:bg-yellow-600 rounded transition duration-200">
              <h2 className="text-lg font-semibold">Blog Management</h2>
              <p className="text-sm">Manage all blogs from this section.</p>
            </div>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/message">
            <div className="py-2 px-4 hover:bg-yellow-600 rounded transition duration-200">
              <h2 className="text-lg font-semibold">Message Management</h2>
              <p className="text-sm">
                Manage all Chat and message from this section.
              </p>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminSidebar;
