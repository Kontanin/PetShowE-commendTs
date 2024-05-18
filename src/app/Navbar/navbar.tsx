"use client"
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link
} from "@nextui-org/react";
import React, { useState } from "react";


import Lastpart from "./LastPart";
import FristPart from "./FristPart";
export default function NavbarMain() {
  const [isOpen, setIsOpen ] = useState(false);

  const handle = () => {
    console.log('clicked',isOpen);
  setIsOpen(!isOpen);
};


  return (
    <Navbar className='bg-amber-300 max-h-full max-w-full flex flex-auto'>
      <NavbarBrand>
        <Link href='/'>

        <p className="font-bold text-inherit">Pet shop</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4 " justify="center">
        {/* Product dropdown part */}
        <FristPart/>

        <NavbarItem isActive    className=" flex justify-center">
          <Link href="/about" aria-current="page" color="foreground">
            AboutUs
          </Link>
        </NavbarItem>

        <NavbarItem isActive    className=" flex justify-center ">
          <Link  href="/blog"  color="foreground">
            Blog
          </Link>
        </NavbarItem>

        <NavbarItem isActive    className=" flex justify-center">
          <Link href="/dev" aria-current="page"   color="foreground">
            AboutDev
          </Link>
        </NavbarItem>

      </NavbarContent>

      {/* end part  */}
      <Lastpart/>
    </Navbar>
  );
}

