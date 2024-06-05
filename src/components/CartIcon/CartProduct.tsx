import React from 'react';
import { Image } from '@nextui-org/react';


export default function CartProduct({ OneProduc }: any) {

  let { productName, image, unitPrice,quantity } = OneProduc;

  return (
    <div>
      <div className=""></div>
      <Image width={150} alt="NextUI hero Image" src={image} />
      <div >
        <h1 className="text-black">{productName}</h1>
        <div className='flex flex-row'>
        <h1 className="text-red-600"> Order:{quantity}</h1>
        <h1 className="text-red-600 margin-bottom"> Price{unitPrice}</h1>
        </div>


        <h1></h1>
      </div>
    </div>
  );
}
