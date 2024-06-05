'use client';
import React from 'react';
import { ListboxWrapper } from '@/components/Footer/ListboxWrapper';
import ItemContainer from './itemContainer';
export default function CardFooter() {
  return (
    <div className="bg-amber-300">
      <ListboxWrapper>
        <ItemContainer></ItemContainer>
      </ListboxWrapper>
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-2">
        <span>@ 2024 appy. ALL right reserved.</span>
        <span>Terms . Privacy Policy</span>
      </div>
    </div>
  );
}
