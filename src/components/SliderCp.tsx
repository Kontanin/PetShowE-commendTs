"use client"

import React from 'react'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
type Product = {
  id:string
  image: string;
  productName: string;
  description: string;
  stock: number;
  unitPrice: number;
  freeShipping: boolean;
  company: string;
  category: string;
};

type SliderCpProps = {
  api: Product[];
};
const SliderCp: React.FC<SliderCpProps>=({api:api1})=> {

  const data = api1.map(product=>{
    return (
      <div className="" key={product.id}>
        <div className="grid justify-items-center ">
          <img src=".\product\product.jpg" className='max-h-64 justify-center mt-6' />
          <h1 className='my-4'>{product.productName}</h1>
        </div>
      </div>
    )
  })



  const settings={
    dots:true,
    infinite:true,
    speed:500,
    slidesToShow:3,
    slidesToScroll:3
  }
  return (
    <Slider className='pl-10 w-[94%] grid justify-items-center' {...settings}>
    {data}
    </Slider>

  )
}

export default SliderCp;