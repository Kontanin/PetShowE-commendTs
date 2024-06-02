'use client';
import React from 'react';
import { Tabs, Tab, Card, CardBody, Image } from '@nextui-org/react';
import Link from 'next/link';
import tabData from './tabData.json';

const tabList = ['Dogs', 'Cats', 'Birds', 'Water Animals', 'Exotic'];

export default function TabsBlob() {
  return (
    <div className="flex w-full flex-col p-4">
      <Tabs aria-label="Options" isVertical={false}>
        {tabList.map(tab => {
          const filteredData = tabData.filter(item => item.tag === tab);
          return (
            <Tab key={tab} title={tab}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredData.map(item => (
                  <Card key={item.id} className="w-full">
                    <CardBody className="p-0 flex flex-col md:flex-row">
                      <Link href={'/blog/' + item.id}>
                        <Image
                          alt="Blog image"
                          className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                          height={250}
                          src={item.image}
                          width={250}
                        />
                      </Link>
                      <div className="p-4 flex-1">
                        <Link href={'/blog/' + item.id}>
                          <h1 className="text-lg font-semibold mb-2">
                            {item.title}
                          </h1>
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
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
}
