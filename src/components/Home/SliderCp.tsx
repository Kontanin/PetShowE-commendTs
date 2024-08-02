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
      spaceBetween={30}
      slidesPerView={3}
      navigation={true}
      pagination={{ clickable: true }}
      modules={[Pagination, Navigation]}
      className="w-full mx-auto"
      breakpoints={{
        1024: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 2,
        },
        480: {
          slidesPerView: 1,
        },
      }}
    >
      {api.map((product) => (
        <SwiperSlide key={product.id}>
          <div className="grid justify-items-center m-10 p-5">
            <Image
              src={product.image}
              width={500}
              height={500}
              alt={product.productName}
              className="w-full h-64 object-cover"
            />
            <h1 className="my-4 text-lg font-semibold">{product.productName}</h1>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SliderCp;
