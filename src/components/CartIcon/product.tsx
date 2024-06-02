import React from 'react';
import { Image } from '@nextui-org/react';


export default function Product({ OneProduc }: any) {
  let num = 0;
  let { productName, image, unitPrice } = OneProduc;

  return (
    <div>
      <div className=""></div>
      <Image width={150} alt="NextUI hero Image" src={image} />
      <div>
        <h1 className="text-black">{productName}</h1>
        <h1 className="text-red-600">{unitPrice}</h1>
        <h1></h1>
      </div>
    </div>
  );
}
