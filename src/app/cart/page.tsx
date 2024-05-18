import React from 'react'
import products from './mockData.json';
import Image from 'next/image';

type Product = {
  id: string;
  image: string;
  productName: string;
  description: string;
  stock: number; 
  unitPrice: number;
  freeShipping: boolean; 
  company: string; 
  category: string; 
};

export default function page() {
  let newp: Product = products[0]; 
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

    <Image
      src={newp.image }
      alt={newp.productName}
      width={500}
      height={500}
      className="rounded-lg"

    />

    <div>
      <h1 className="text-5xl font-bold">{newp.productName}</h1>

      <p className="py-6">{newp["description"]}</p> 

    </div>
  </div>
  )
}
