'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
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

type SliderCpProps = {
  api: Product[];
};

const SliderCp: React.FC<SliderCpProps> = ({ api }) => {
  return (
    <Swiper
      spaceBetween={10} // Reduced space between slides for partial visibility
      slidesPerView={6}
      centeredSlides={false} // Center the active slide
      navigation={true}
      pagination={{ clickable: true }}
      modules={[Pagination, Navigation]}
      loop={true}
    >
      {api.map(product => (
        <SwiperSlide key={product.id}>
          <div className="pb-10 grid justify-center">
            <Image
              src={product.image}
              alt={product.productName}
              width={200}
              height={200}
            />
            <h3>{product.productName}</h3>
            <p className="text-red-500"> ${product.unitPrice}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SliderCp;
