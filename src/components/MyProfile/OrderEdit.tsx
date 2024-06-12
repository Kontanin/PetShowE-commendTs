import React from 'react';

interface Order {
  id: string;
  isActive: boolean;
  shippingFee: boolean;
  total: number;
  paymentIntentId?: string;
  status: string;
  timestamps: string;
  tax: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const initialOrders: Order[] = [
  {
    id: '1',
    isActive: true,
    shippingFee: false,
    total: 150.0,
    status: 'Shipped',
    timestamps: '2024-06-01T12:00:00Z',
    tax: 10.0,
    userId: 'user1',
    createdAt: '2024-06-01',
    updatedAt: '2024-06-02',
  },
  {
    id: '2',
    isActive: true,
    shippingFee: false,
    total: 75.5,
    status: 'Processing',
    timestamps: '2024-06-05T12:00:00Z',
    tax: 5.5,
    userId: 'user2',
    createdAt: '2024-06-05',
    updatedAt: '2024-06-06',
  },
  {
    id: '3',
    isActive: true,
    shippingFee: false,
    total: 200.0,
    status: 'Delivered',
    timestamps: '2024-06-07T12:00:00Z',
    tax: 15.0,
    userId: 'user3',
    createdAt: '2024-06-07',
    updatedAt: '2024-06-08',
  },
];

export const OrderEdit: React.FC = () => {
  return (
    <div className="mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-200">Order ID</th>
              <th className="py-2 px-4 border-b-2 border-gray-200">Status</th>
              <th className="py-2 px-4 border-b-2 border-gray-200">Total</th>
              <th className="py-2 px-4 border-b-2 border-gray-200">Tax</th>
              <th className="py-2 px-4 border-b-2 border-gray-200">Date Created</th>
              <th className="py-2 px-4 border-b-2 border-gray-200">Date Updated</th>
            </tr>
          </thead>
          <tbody>
            {initialOrders.map((order) => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b border-gray-200">{order.id}</td>
                <td className={`py-2 px-4 border-b border-gray-200 ${order.status === 'Shipped' ? 'text-blue-500' : order.status === 'Processing' ? 'text-yellow-500' : 'text-green-500'}`}>
                  {order.status}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">${order.total.toFixed(2)}</td>
                <td className="py-2 px-4 border-b border-gray-200">${order.tax.toFixed(2)}</td>
                <td className="py-2 px-4 border-b border-gray-200">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b border-gray-200">{new Date(order.updatedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
