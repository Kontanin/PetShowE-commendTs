'use client';
import React from 'react';
import CardFooter from './cardFooter';
import ChatBox from '@/components/Chatbox/ChatBox';
import { useUserStore } from '@/store/zustand';
export default function Footer() {
  const { isAuthenticated } = useUserStore();
  return (
    <div>
      {isAuthenticated && <ChatBox></ChatBox>}
      <CardFooter></CardFooter>
    </div>
  );
}
