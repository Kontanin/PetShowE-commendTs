'use client';
import React, { useState } from 'react';
import { AddressEdit } from '@/components/MyProfile/AdressEdit';
import { ProfileEdit } from '@/components/MyProfile/ProfileEdit';
import OrderEdit from '@/components/MyProfile/OrderEdit';

enum Tab {
  Profile = 'Profile',
  Address = 'Address',
  MyOrder = 'My Order',
}

const SidebarNavigation: React.FC = () => {
  const bottoncss = 'w-full text-lg font-bold py-4 px-2 text-center';
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.Profile);

  const renderContent = () => {
    switch (selectedTab) {
      case Tab.Profile:
        return <ProfileEdit />;
      case Tab.Address:
        return <AddressEdit />;
      case Tab.MyOrder:
        return <OrderEdit />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-[70vh]">
      <div className="w-1/4 bg-gray-200 p-6 space-y-4">
        <button
          className={`${bottoncss} ${selectedTab === Tab.Profile ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          onClick={() => setSelectedTab(Tab.Profile)}
        >
          Profile
        </button>
        <button
          className={`${bottoncss} ${selectedTab === Tab.Address ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          onClick={() => setSelectedTab(Tab.Address)}
        >
          Address
        </button>
        <button
          className={`${bottoncss} ${selectedTab === Tab.MyOrder ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          onClick={() => setSelectedTab(Tab.MyOrder)}
        >
          My Order
        </button>
      </div>
      <div className="w-3/4 p-6">{renderContent()}</div>
    </div>
  );
};

export default SidebarNavigation;
