"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// Type declarations
interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

const DiscountAd: React.FC = () => {
  const endTime = new Date(Date.now() + 48 * 60 * 60 * 1000);

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const diff = endTime.getTime() - now.getTime();

    if (diff <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-blue-100 rounded-lg shadow-lg p-6 mb-6 flex flex-col md:flex-row items-center">
      <div className="md:w-1/2">
        {/* <Image
          src="/images/pet-shop-discount.png"
          alt="Pet Shop Discount"
          width={500}
          height={300}
          className="rounded-lg"
        /> */}
      </div>
      <div className="md:w-1/2 md:ml-6 mt-4 md:mt-0">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">Special 48-Hour Discount!</h2>
        <p className="text-lg text-gray-700 mb-4">
          Enjoy a 20% discount on all pet accessories and food items. Visit our shop now and get the best deals for your beloved pets.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Offer valid for the next 48 hours!
        </p>
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          {`${timeLeft.hours.toString().padStart(2, '0')}:${timeLeft.minutes.toString().padStart(2, '0')}:${timeLeft.seconds.toString().padStart(2, '0')}`}
        </h1>
        <button className="bg-blue-800 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default DiscountAd;
