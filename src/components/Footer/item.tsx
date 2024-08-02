'use client';
import React from 'react';
import Link from 'next/link';

export default function Item({
  Links
}: {
  Links: Array<{ name: string; path: string }>;
  title: string;
}) {
  const o = Links.map(item => (
    <div className="mb-1" key={item.name}>
      <Link
        href={item.path}
        className="text-gray-400 hover:text-teal-400 duartion-300 text-sm cursor-pointer leading-6"
      >
        {item.name}
      </Link>
    </div>
  ));

  return (
   o
  );
}
