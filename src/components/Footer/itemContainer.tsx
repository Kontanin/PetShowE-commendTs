'use client';
import React from 'react';
import Link from 'next/link';
import Item from './item';
import { products, social, contact } from './manu';

export default function ItemContainer() {
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-x-80 sm:px-8 px-5">
      <Item Links={products} title="products"></Item>

      <Item Links={social} title="social"></Item>
      <Item Links={contact} title="contact"></Item>
    </div>
  );
}
