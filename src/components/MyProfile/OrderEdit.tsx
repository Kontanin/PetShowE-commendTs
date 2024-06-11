import React from 'react';

interface Order {
  id: number;
  status: string;
  value: number;
  dateCreated: string;
}

const initialOrders: Order[] = [
  { id: 1, status: 'Shipped', value: 150.0, dateCreated: '2024-06-01' },
  { id: 2, status: 'Processing', value: 75.5, dateCreated: '2024-06-05' },
  { id: 3, status: 'Delivered', value: 200.0, dateCreated: '2024-06-07' },
];

export const OrderEdit: React.FC = () => {
  return (
    <div className=" mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-200">Order ID</th>
              <th className="py-2 px-4 border-b-2 border-gray-200">Status</th>
              <th className="py-2 px-4 border-b-2 border-gray-200">Value</th>
              <th className="py-2 px-4 border-b-2 border-gray-200">Date Created</th>
            </tr>
          </thead>
          <tbody>
            {initialOrders.map((order) => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b border-gray-200">{order.id}</td>
                <td className={`py-2 px-4 border-b border-gray-200 ${order.status === 'Shipped' ? 'text-blue-500' : order.status === 'Processing' ? 'text-yellow-500' : 'text-green-500'}`}>
                  {order.status}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">${order.value.toFixed(2)}</td>
                <td className="py-2 px-4 border-b border-gray-200">{order.dateCreated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
