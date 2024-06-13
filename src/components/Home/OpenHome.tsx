import React from 'react';
import Link from 'next/link';

const pugImage = '/home/1.jpg';

const PetShopHero = () => {
  return (
    <div
      className=" flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(236, 180, 5, 1)' }}
    >
      <div className="relative max-w-7xl w-full flex rounded-lg overflow-hidden">
        <div className="w-1/2 flex flex-col items-start justify-center text-left p-8">
          <h1 className="text-6xl font-bold text-white mb-4">Pet Hogp</h1>
          <p className="text-white text-lg mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex space-x-4">
            <Link href="/product">
            <button className="bg-black text-white px-6 py-3 rounded-full text-lg">
              Shop
            </button>
            </Link>
<Link href="/about">
<button className="bg-white text-black border border-black px-6 py-3 rounded-full text-lg">
              About Us
            </button>
</Link>

          </div>
        </div>
        <div className="w-1/2 h-full">
          <img
            src={pugImage}
            alt="Pug in Sweater"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default PetShopHero;
