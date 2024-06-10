'use client';
import React from 'react';
import CardFooter from './cardFooter';
import ChatBox from '@/components/Chatbox/ChatBox';
import { UserStore } from '@/store/UserStore';
export default function Footer() {
  const { isAuthenticated } = UserStore();
  console.log(isAuthenticated, 'authentication');
  return (
    <div>
      {/* {isAuthenticated && <ChatBox></ChatBox>} */}
      <CardFooter></CardFooter>
    </div>
  );
}
