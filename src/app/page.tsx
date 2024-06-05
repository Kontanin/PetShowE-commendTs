'use client';
import React from 'react';
import api from './mockData.json';
import SliderCp from '@/components/Home/SliderCp';
import CardCom from '@/components/Home/card';

export default function Home() {
  return (
    <div>
      <div>
        <img src="\adver\cat.webp" className="min-w-max" />
        <h1 className="pl-2">Popular proudct</h1>
        {/* <SliderCp key="q" api={api}></SliderCp> */}
        <h1 className="pl-2">New proudct</h1>
        {/* <SliderCp api={api}></SliderCp> */}
        <h1 className="pt-10">Review</h1>
        <div className="grid grid-cols-3 gap-4">
          <CardCom></CardCom>
          <CardCom></CardCom>
          <CardCom></CardCom>
        </div>
      </div>
    </div>
  );
}
