'use client';
import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
  const listLocations = [
    {
      name: '101market',
      address: 'Market 101 Phahonyothin Rd, Chatuchak, Bangkok 10900',
      contact: ['093 808 3xxx', '02 015 2xxx', '093 810 8xx'],
      Openhours: '9 am - 8 pm',
      img: '/about/about.png',
    },
    {
      name: '102market',
      address: 'Market 101 Phahonyothin Rd, Chatuchak, Bangkok 10900',
      contact: ['093 808 3xxx', '093 810 8xx'],
      Openhours: '10 am - 8 pm',
      img: '/about/about.png',
    },
    {
      name: '103market',
      address: 'Market 101 Phahonyothin Rd, Chatuchak, Bangkok 10900',
      contact: ['093 809 xxxx'],
      Openhours: '10 am - 8:30 pm',
      img: '/about/about.png',
    },
  ];

  const card = listLocations.map((Branch) => {
    const contact = Branch.contact.map((Contact) => {
      return <p key={Contact} className="text-gray-700">{Contact}</p>;
    });

    return (
      <div key={Branch.name} className="bg-white shadow-md rounded-lg p-6 mb-6 max-w-full flex flex-col md:flex-row items-center md:items-start">
        <Image
          src={Branch.img}
          alt={Branch.name}
          width={300}
          height={200}
          className="rounded-lg mb-4 md:mb-0 md:mr-6"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">{Branch.name}</h2>
          <div className="mb-4">
            <h4 className="font-medium text-gray-800">Address</h4>
            <p className="text-gray-600">{Branch.address}</p>
          </div>
          <div className="mb-4">
            <h4 className="font-medium text-gray-800">Contact</h4>
            <div>{contact}</div>
          </div>
          <div className="mb-4">
            <h4 className="font-medium text-gray-800">Open Hours</h4>
            <p className="text-gray-600">{Branch.Openhours}</p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-gray-700 my-6">
        About Us
      </h1>
      <div className="grid grid-cols-1 gap-6">
        {card}
      </div>
    </div>
  );
}
