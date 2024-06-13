'use client';
import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Select, SelectItem } from "@nextui-org/react";
type OrderItem = {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number;
};

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
  items: OrderItem[];
};

type OrderManagementProps = {
  orders: Order[];
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
    items: [
      { id: 'item_1', productName: 'Product 1', quantity: 2, unitPrice: 50 },
      { id: 'item_2', productName: 'Product 2', quantity: 1, unitPrice: 100 },
      { id: 'item_2', productName: 'Product 2', quantity: 1, unitPrice: 100 },
      { id: 'item_2', productName: 'Product 2', quantity: 1, unitPrice: 100 },
      { id: 'item_2', productName: 'Product 2', quantity: 1, unitPrice: 100 },
    ],
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
    items: [
      { id: 'item_3', productName: 'Product 3', quantity: 3, unitPrice: 50 },
    ],
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
    items: [
      { id: 'item_4', productName: 'Product 4', quantity: 1, unitPrice: 300 },
    ],
  },
];
const OrderManagement: React.FC<OrderManagementProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatedStatus, setUpdatedStatus] = useState<string>('');

  const handleView = (order: Order) => {
    setSelectedOrder(order);
    setUpdatedStatus(order.status); // Set default value
    onOpen();
  };

  const handleUpdateStatus = () => {
    if (selectedOrder) {
      console.log(`Update status of order with id: ${selectedOrder.id} to ${updatedStatus}`);
      // Handle update order status logic
      // Here you can make an API call to update the status of the order
      onClose();
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Order Management</h2>
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
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => handleView(order)}
                >
                  Update Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal size="md" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Order Details</ModalHeader>
              <ModalBody>
                {selectedOrder && (
                  <>
                    <p><strong>ID:</strong> {selectedOrder.id}</p>
                    <p><strong>User ID:</strong> {selectedOrder.userId}</p>
                    <p><strong>Total:</strong> ${selectedOrder.total}</p>
                    <p><strong>Shipping Fee:</strong> {selectedOrder.shippingFee ? 'Yes' : 'No'}</p>
                    <p><strong>Tax:</strong> ${selectedOrder.tax}</p>
                    <p><strong>Status:</strong> {selectedOrder.status}</p>
                    <p><strong>Created At:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                    <p><strong>Order Items:</strong></p>
                    <ul>
                      {selectedOrder.items.map(item => (
                        <li key={item.id}>
                          {item.productName} - Quantity: {item.quantity} - Price: ${item.unitPrice}
                        </li>
                      ))}
                    </ul>
                
                    <div className="mt-4">
                      <label htmlFor="updateStatus" className="block text-sm font-medium text-gray-700">Update Status:</label>

                      <Select
                        id="updateStatus"
                        value={updatedStatus}
                        onChange={(e) => setUpdatedStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        defaultSelectedKeys={[selectedOrder.status]}
                      >
                        <SelectItem key="Pending" value="Pending">Pending</SelectItem>
                        <SelectItem key="Shipped" value="Shipped">Shipped</SelectItem>
                        <SelectItem key="Delivered" value="Delivered">Delivered</SelectItem>
                      </Select>
                    </div>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleUpdateStatus}>
                  Update Status
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default OrderManagement;
