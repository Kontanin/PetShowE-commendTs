'use client';
import React from 'react';
import CardFooter from './cardFooter';
import ChatBox from '@/components/Chatbox/Chatbox';
import { UserStore } from '@/store/UserStore';
export default function Footer() {
  const { isAuthenticated } = UserStore();
  console.log(isAuthenticated, 'authentication');
  return (
    <div className="p-2">
      {isAuthenticated && <ChatBox/>}
      <CardFooter/>
    </div>
  );
}
