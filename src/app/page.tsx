'use client';
import React from 'react';

import SliderCp from '@/components/Home/SliderCp';
import CardCom from '@/components/Home/Cardcom';
import PetShopHero from '../components/Home/OpenHome';
import DiscountAd from '@/components/Home/Discount';
import products from '@/data/products.json';
export default function Home() {
  return (
    <div>
        <DiscountAd></DiscountAd>
        <PetShopHero></PetShopHero>
        <h1 className="pl-2">Popular proudct</h1>
        <SliderCp key="q" api={products}></SliderCp>
        <h1 className="pl-2">New proudct</h1>
        <SliderCp api={products}></SliderCp>
        <h1 className="pt-10">Blog</h1>
        <CardCom></CardCom>
    </div>
  );
}
