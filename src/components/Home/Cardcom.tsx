'use client';

import React, { useState, useEffect } from 'react';
import { Card, Image, CardBody } from '@nextui-org/react';
import Link from 'next/link';

const mockData = [
  {
    id: 1,
    title: 'Amazing Dogs: A Comprehensive Guide',
    createdAt: '2023-05-01T00:00:00Z',
    content: 'Dogs are amazing pets with incredible loyalty.',
    image: 'https://nextui.org/images/hero-card.jpeg',
  },
  {
    id: 2,
    title: 'Cute Puppies: How to Raise Them Right',
    createdAt: '2023-05-02T00:00:00Z',
    content: 'Puppies are very cute and playful.',
    image: 'https://nextui.org/images/hero-card.jpeg',
  },
];

export default function CardCom() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex justify-center space-x-4">
      {mockData.map((item) => (
        <Card key={item.id} className="w-1/2 mb-4 shadow-lg rounded-lg overflow-hidden">
          <CardBody className="p-0 flex flex-row">
            <Link href={'/blog/' + item.id}>
              <Image
                alt={item.content}
                className="object-cover"
                height={250}
                src={item.image}
                width={250}
              />
            </Link>
            <div className="p-4 flex-1">
              <Link href={'/blog/' + item.id}>
                <h1 className="text-lg font-semibold mb-2">{item.title}</h1>
              </Link>
              <p className="text-sm text-gray-500 mb-2">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-4">{item.content}</p>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
