'use client';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from '@nextui-org/react';
import React, { useState } from 'react';
import Lastpart from './LastPart';
import FristPart from './FristPart';
import Image from 'next/image';
export default function NavbarMain() {
  const [isOpen, setIsOpen] = useState(false);

  const handle = () => {
    console.log('clicked', isOpen);
    setIsOpen(!isOpen);
  };

  return (
    <Navbar className="bg-amber-300 max-h-full max-w-full flex flex-auto text-base  ">
      <NavbarBrand>
        <Link href="/">
          <Image
            src="/icon/pawprint.png"
            width={40}
            height={40}
            alt="Main Icon"
            className="m-4"
          ></Image>
          {/* <p className="font-bold  text-black">Pet shop</p> */}
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4 " justify="center">
        {/* Product dropdown part */}
        <FristPart />

        <NavbarItem isActive className=" flex justify-center">
          <Link href="/about" aria-current="page" color="foreground">
            <p className="text-base text-black">AboutUs</p>
          </Link>
        </NavbarItem>

        <NavbarItem isActive className=" flex justify-center ">
          <Link href="/blog" color="foreground">
            <p className="text-base text-black">Blog</p>
          </Link>
        </NavbarItem>

        <NavbarItem isActive className=" flex justify-center">
          <Link href="/dev" aria-current="page">
            <p className="text-base text-black">AboutDev</p>
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* end part  */}
      <Lastpart />
    </Navbar>


  );
}
