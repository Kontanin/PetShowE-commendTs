'use client';
import React from 'react';
import { Tabs, Tab, Card, CardBody, Image, Button } from '@nextui-org/react';
import { loremIpsum } from 'lorem-ipsum';
import Link from 'next/link';
import { AiOutlineDislike } from 'react-icons/ai';
import { AiOutlineLike } from 'react-icons/ai';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
export default function TabsBlob() {
  const blog = [
    {
      id: 'asdf',
      title: loremIpsum({
        count: 4, // Number of "words", "sentences", or "paragraphs"
        format: 'plain', // "words", "sentences", or "paragraphs"
      }),
      userId: 'user1',
      username: 'John Doe',
    },
    // add more blog posts here
  ];
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options" isVertical={true}>
        <Tab key="photos" title="Dogs">
          <Card>
            <CardBody>
              <Card
                isFooterBlurred
                radius="lg"
                className="border-none flex flex-row justify-start items-start max-h-50"
              >
                <Link href={'/blog/' + blog[0].id}>
                  <Image
                    alt="Woman listing to music"
                    className="object-cover bg-green-300 basis-2/6"
                    height={250}
                    src="https://nextui.org/images/hero-card.jpeg"
                    width={250}
                  />
                </Link>

                <div className="w-full flex justify-center items-center basis-11/12">
                  <div className="bg-red-300 w-full">
                    <Link href={'/blog/' + blog[0].id}>
                      <div className="mb-2">
                        <h1>asdf</h1>
                      </div>
                    </Link>
                    <p>{blog[0].title}</p>
                  </div>
                  <div
                    className="items-end overflow-hidden  absolute
                            before:rounded-xl rounded-large bottom-1   ml-1 z-10"
                  >
                    <Button className="text-tiny bg-white">
                      <AiOutlineLike className="w-full" size={30} />
                    </Button>
                    <Button className="text-tiny bg-white">
                      <AiOutlineDislike className="w-full" size={30} />
                    </Button>

                    <Button className="text-tiny bg-white">
                      <Link href={'/blog/' + blog[0].id}>
                        <IoChatboxEllipsesOutline
                          className="w-full"
                          size={30}
                        />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="Cats" title="Cats">
          <Card>
            <CardBody>asdf</CardBody>
          </Card>
        </Tab>
        <Tab key="Exotic" title="Exotic">
          <Card>
            <CardBody>asdf</CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
