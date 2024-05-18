"use client"
import React, { Component } from 'react'
import {Divider} from "@nextui-org/react";
import { useState } from 'react';


import TabsBlob from '@/components/TabsBlob';
export default function blog() {
  return (
    <div>
      
    <div className="max-w-full">
    <h1 className="text-4xl font-bold text-start text-gray-700 my-3">Blog</h1>
    <TabsBlob/>

    </div> 
    </div>

  );
}
