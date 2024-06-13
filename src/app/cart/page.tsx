// pages/shopping-bag.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';
import items from '@/data/OrderProduct.json';
import { useRouter } from 'next/navigation';
import doPostRequest from '@/utils/doPostRequest';
import { OrderProduct, OrderPayload } from '@/types/orderProductType';

import Link from 'next/link';

const groupBy = <T,>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce(
    (result, currentValue) => {
      const groupKey = currentValue[key] as unknown as string;
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(currentValue);
      return result;
    },
    {} as Record<string, T[]>,
  );
};

const ShoppingBag = () => {
  const router = useRouter();
  const groupedItems = groupBy(items, 'company');
  const [itemQuantities, setItemQuantities] = useState(
    items.map(item => ({ id: item.id, quantity: item.quantity })),
  );

  const handleQuantityChange = (id: string, quantity: number) => {
    setItemQuantities(
      itemQuantities.map(item =>
        item.id === id ? { ...item, quantity } : item,
      ),
    );
  };

  const getItemQuantity = (id: string) => {
    const item = itemQuantities.find(item => item.id === id);
    return item ? item.quantity : 1;
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * getItemQuantity(item.id),
    0,
  );
  const totalShipping = items.reduce(
    (sum, item) => sum + (item.freeShipping ? 0 : 15),
    0,
  ); // Assuming a flat shipping rate for simplicity
  const total = subtotal + totalShipping;

  const handleSecureCheckout = async () => {
    const payload: OrderPayload = {
      userId: 'some-user-id', // replace with actual user ID
      items: itemQuantities.map(i => ({ id: i.id, quantity: i.quantity })),
      totalAmount: total,
      shippingFee:20
      ,tax:20
    };

    const response = await doPostRequest(payload, '/api/create-order');

    if (response) {
      router.push('/cart/test'); // redirect to the payment page
    } else {
      console.error('Payment failed');
    }
  };

  return (
    <div className="min-h-full bg-gray-100 flex items-start justify-center py-10">
      <div className="bg-white shadow-md rounded-lg w-3/4 p-8">
        <h2 className="text-2xl font-semibold mb-6">Your Shopping Bag</h2>
        {Object.keys(groupedItems).map(key => (
          <div key={key}>
            <h3 className="text-xl font-semibold mb-4">{key}</h3>
            <div className="space-y-4">
              {groupedItems[key].map((item: OrderProduct) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <Image
                      src={item.image}
                      alt={item.description}
                      width={50}
                      height={50}
                    />
                    <div>
                      <h3 className="font-semibold">{item.productName}</h3>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span>${item.unitPrice.toFixed(2)}</span>
                    <span>
                      {item.freeShipping
                        ? 'Free shipping'
                        : `Est. shipping $15.00`}
                    </span>
                    <input
                      type="number"
                      className="w-12 text-center border rounded"
                      value={getItemQuantity(item.id)}
                      min={1}
                      onChange={e =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <span>Estimated Shipping:</span>
            <span>${totalShipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold mt-4">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <Link href="/products">
            <button className="px-6 py-2 border rounded-lg">
              Continue Shopping
            </button>
          </Link>
          <button
            onClick={handleSecureCheckout}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Secure Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingBag;
