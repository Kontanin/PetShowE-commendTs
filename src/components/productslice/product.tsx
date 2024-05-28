import React from 'react';
import { Image } from '@nextui-org/react';
import { BsPlus, BsEyeFill } from 'react-icons/bs';

export default function Product({ OneProduc }: any) {
  let num = 0;
  let { productName, image, unitPrice } = OneProduc;

  return (
    <div>
      {/* className='border border-[#d3a5a5] mb-4
        relative overflow-hidden group transition max-w-[10px] max-h-[10px] ' */}
      <div className=""></div>
      <Image width={150} alt="NextUI hero Image" src="/product/1.jpg" />
      <div>
        <h1 className="text-black">{productName}</h1>
        <h1 className="text-red-600">{unitPrice}</h1>
      </div>
    </div>
  );
}
