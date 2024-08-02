'use client';
import React from 'react';
import Item from './item';


export const products = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'help&feedback', path: '/help&feedback' },
];
export const social = [
  { name: 'Facebook', path: 'https://www.facebook.com' },
  { name: 'Twitter', path: 'https://www.twitter.com' },
  { name: 'Instagram', path: 'https://www.instagram.com' },
  { name: 'LinkedIn', path: 'https://www.linkedin.com' },
];
export const contact = [
  { name: 'Phone', path: 'tel:123-456-7890' },
  { name: 'Email', path: '#' },
  { name: 'Address', path: '#' },
  { name: 'City', path: '#' },
  { name: 'Country', path: '#' },
];



export default function CardFooter() {
  return (
    <div className="bg-amber-300">
        <div className="w-full max-w-full border-small bg-amber-300 px-1 py-2 rounded-small border-default-200 dark:border-default-100">
        <div className=" grid grid-cols-1 sm:grid-cols-3  px-5">
        <Item Links={products} title="products"></Item>
        <Item Links={social} title="social"></Item>
        <Item Links={contact} title="contact"></Item>
        </div>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-2">
        <span>@ 2024 appy. ALL right reserved.</span>
        <span>Terms . Privacy Policy</span>
      </div>
    </div>
  );
}
