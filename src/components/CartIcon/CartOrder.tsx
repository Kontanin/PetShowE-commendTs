'use client';
import { Link } from '@nextui-org/react';
import React, { useEffect } from 'react';

import Product from './product';
import { CartState } from '@/store/CartStore';
export default function CartOrder() {
  const Order = CartState(state => state.cart);
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
