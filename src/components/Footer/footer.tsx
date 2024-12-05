'use client';
import React, { useState, useEffect } from 'react';
import CardFooter from './cardFooter';
import ChatBox from '@/components/ChatBox/ChatBox';
import { UserStore } from '@/store/UserStore';

export default function Footer() {
  const [newMessageCount, setNewMessageCount] = useState(0);
  const { isAuthenticated, id } = UserStore();

  useEffect(() => {
    // ดึงข้อมูล newMessageCount จาก API เมื่อ component ถูก mount
    const fetchMessageCount = async () => {
      try {
        const res = await fetch('/api/messages/count'); // API endpoint ที่ใช้ดึง count
        if (!res.ok) {
          throw new Error('Failed to fetch message count');
        }
        const data = await res.json();
        setNewMessageCount(data.count); // สมมติว่า API ส่ง count กลับมาใน data.count
      } catch (error) {
        console.error('Error fetching message count:', error);
      }
    };

    fetchMessageCount();
  }, []); // รัน useEffect เมื่อ component ถูก mount
  return (
    <div className="p-2">
      {/* {isAuthenticated && id !== 'admin' && (
        <ChatBox newMessageCount={newMessageCount} />
      )} */}
      <ChatBox newMessageCount={newMessageCount} />
      <CardFooter />
    </div>
  );
}
