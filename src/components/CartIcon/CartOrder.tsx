'use client';
import { Link } from '@nextui-org/react';
import React from 'react';
import { CartStore } from '@/store/CartStore';
import CartProduct from './CartProduct';
export default function CartOrder() {
  const Order = CartStore(state => state.cart);
  let HiddenOrder = Order.length > 4 ? Order.length - 4 : null;
  const product = Order.slice(0, 4).map(item => {
    return (
      <div key={item.id}>
        <CartProduct OneProduc={item} />
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
