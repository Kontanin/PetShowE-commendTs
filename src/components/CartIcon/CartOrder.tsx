'use client';
import { Link } from '@nextui-org/react';
import React, { useEffect } from 'react';

import Product from './product';
import { StoreState } from '@/store/zustand';

export default function CartOrder() {
  const Order = StoreState(state => state.cart);
  let HiddenOrder = Order.length > 4 ? Order.length - 4 : null;
  const product = Order.slice(0, 4).map(item => {
    return (
      <div key={item.id}>
        <Product OneProduc={item} />
      </div>
    );
  });

  return (
    <div>
      {product}
      <Link href="/cart">more ...{HiddenOrder} in your cart </Link>
    </div>
  );
}
