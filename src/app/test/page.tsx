'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import products from '@/data/products.json';
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

const SliderCp: React.FC<SliderCpProps> = () => {
  const api = products;
  return (
    <Swiper>
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <span slot="container-start">Container Start</span>
    </Swiper>
  );
};

export default SliderCp;
