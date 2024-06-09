'use client';
import React from 'react';

import SliderCp from '@/components/Home/SliderCp';
import CardCom from '@/components/Home/card';
import DiscountAd from './tes/page';

export default function Home() {
  const api = [
    {
      id: 'B3-92-BD-33-BA-DA',
      productName: 'Lentibulariaceae',
      description: 'randon detail',
      stock: 1,
      unitPrice: 354,
      image:
        'https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure-1536x864.webp',
      freeShipping: true,
      company: 'Sporer-Gerlach',
      category: 'Kelp gull',
    },
    {
      id: '74-C4-4D-89-B0-48',
      productName: 'Zygophyllaceae',
      description: 'randon detail',
      stock: 2,
      unitPrice: 150,
      image:
        'https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure-1536x864.webp',
      freeShipping: false,
      company: 'Toy and Sons',
      category: 'Bottle-nose dolphin',
    },
    {
      id: '8F-50-CC-EF-E1-9B',
      productName: 'Boraginaceae',
      description: 'randon detail',
      stock: 3,
      unitPrice: 699,
      image:
        'https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure-1536x864.webp',
      freeShipping: false,
      company: 'Abbott, Schowalter and Thompson',
      category: 'Robin, kalahari scrub',
    },
  ];

  return (
    <div>
      <div>
        <div>
          <DiscountAd></DiscountAd>
        </div>

        <h1 className="pl-2">Popular proudct</h1>

        <SliderCp key="q" api={api}></SliderCp>
        <h1 className="pl-2">New proudct</h1>
        <SliderCp api={api}></SliderCp>
        <h1 className="pt-10">Blog</h1>
        <div className="grid grid-cols-3 gap-4">
          <CardCom></CardCom>
        </div>
      </div>
    </div>
  );
}
