"use client"

import React,{useState,createContext} from 'react'
import mockData from './mockData1.json';
import { IoMdArrowForward } from 'react-icons/io';
import { FiTrash2 } from 'react-icons/fi';

import  MapProduct from '@/components/productslice/mapProduct';
export default function SliderBar() {

  // const [isOpen,setIsOpen]=useState(false);
  let isOpen=true
  // const handleClose=()=>{
  //   setIsOpen(false)
  // }


  return (
    <div className={
    isOpen?
    'right-0 w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] mt-16':
    'right-full w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw]'} >
      
  <MapProduct></MapProduct>
      </div>
  )
}
// `&{isOpen}w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw]`