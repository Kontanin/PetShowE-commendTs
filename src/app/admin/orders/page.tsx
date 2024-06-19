'use client';
import React from 'react';
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import Link from 'next/link';
type Order = {
  id: string;
  shippingFee?: boolean;
  total: number;
  paymentIntentId?: string;
  status: string;
  timestamps: string;
  tax: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

const orders: Order[] = [
  {
    id: '1',
    shippingFee: true,
    total: 200,
    paymentIntentId: 'pi_123',
    status: 'Pending',
    timestamps: new Date().toISOString(),
    tax: 20,
    userId: 'user_1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    shippingFee: false,
    total: 150,
    paymentIntentId: 'pi_124',
    status: 'Shipped',
    timestamps: new Date().toISOString(),
    tax: 15,
    userId: 'user_2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    shippingFee: true,
    total: 300,
    paymentIntentId: 'pi_125',
    status: 'Delivered',
    timestamps: new Date().toISOString(),
    tax: 30,
    userId: 'user_3',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const OrderManagement: React.FC = () => {
  const handleView = (id: string) => {
    // Handle view order logic
    console.log(`View order with id: ${id}`);
  };

  const handleUpdateStatus = (id: string) => {
    // Handle update order status logic
    console.log(`Update status of order with id: ${id}`);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Order Management</h2>
      <Breadcrumbs>
      <BreadcrumbItem>
      <Link href="/admin">admin</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>     <Link href="/admin/orders">orders</Link></BreadcrumbItem>
    </Breadcrumbs>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">ID</th>
            <th className="py-2 px-4 border-b border-gray-200">User ID</th>
            <th className="py-2 px-4 border-b border-gray-200">Total</th>
            <th className="py-2 px-4 border-b border-gray-200">Shipping Fee</th>
            <th className="py-2 px-4 border-b border-gray-200">Tax</th>
            <th className="py-2 px-4 border-b border-gray-200">Status</th>
            <th className="py-2 px-4 border-b border-gray-200">Created At</th>
            <th className="py-2 px-4 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td className="py-2 px-4 border-b border-gray-200">{order.id}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                {order.userId}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                ${order.total}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {order.shippingFee ? 'Yes' : 'No'}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                ${order.tax}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {order.status}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                  onClick={() => handleView(order.id)}
                >
                  View
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => handleUpdateStatus(order.id)}
                >
                  Update Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
