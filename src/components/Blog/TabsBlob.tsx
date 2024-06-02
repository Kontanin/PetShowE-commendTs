'use client';
import React from 'react';
import { Tabs, Tab, Card, CardBody, Image } from '@nextui-org/react';
import Link from 'next/link';

// JSON data representing the tabs and content
const tabData = [
  {
    key: 'Dogs',
    title: 'Dogs',
    content: [
      {
        id: '1',
        title: 'Amazing Dogs',
        image: 'https://nextui.org/images/hero-card.jpeg',
        description: 'Dogs are amazing pets with incredible loyalty.',
        userId: 'user1',
        username: 'John Doe',
      },
      {
        id: '2',
        title: 'Cute Puppies',
        image: 'https://nextui.org/images/hero-card.jpeg',
        description: 'Puppies are very cute and playful.',
        userId: 'user2',
        username: 'Jane Doe',
      },
    ],
  },
  {
    key: 'Cats',
    title: 'Cats',
    content: [
      {
        id: '3',
        title: 'Lovely Cats',
        image: 'https://nextui.org/images/hero-card.jpeg',
        description: 'Cats are known for their grace and agility.',
        userId: 'user3',
        username: 'Alice',
      },
    ],
  },
  {
    key: 'Exotic',
    title: 'Exotic',
    content: [
      {
        id: '4',
        title: 'Exotic Animals',
        image: 'https://nextui.org/images/hero-card.jpeg',
        description: 'Exotic animals are unique and fascinating.',
        userId: 'user4',
        username: 'Bob',
      },
    ],
  },
];

export default function TabsBlob() {
  return (
    <div className="flex w-full flex-col p-4">
      <Tabs aria-label="Options" isVertical={true}>
        {tabData.map(tab => (
          <Tab key={tab.key} title={tab.title}>
            {tab.content.map(post => (
              <Card key={post.id} className="mb-4">
                <CardBody>
                  <Card
                    isFooterBlurred
                    radius="lg"
                    className="border-none flex flex-row justify-start items-start"
                  >
                    <Link href={'/blog/' + post.id}>
                      <Image
                        alt="Blog image"
                        className="object-cover rounded-lg mr-4"
                        height={250}
                        src={post.image}
                        width={250}
                      />
                    </Link>

                    <div className="w-full flex flex-col justify-between">
                      <div>
                        <Link href={'/blog/' + post.id}>
                          <h1 className="text-xl font-bold mb-2">
                            {post.username}
                          </h1>
                        </Link>
                        <p className="text-gray-700 mb-4">{post.description}</p>
                      </div>
                    </div>
                  </Card>
                </CardBody>
              </Card>
            ))}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
