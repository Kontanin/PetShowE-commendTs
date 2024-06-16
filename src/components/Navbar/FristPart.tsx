'use client';
import React from 'react';

import {
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from '@nextui-org/react';
export default function FristPart() {
  return (
    <Dropdown>
      <NavbarItem className="w-[80px] ">
        <DropdownTrigger>
          <Button
            className="bg-transparent  font-bold  "
            radius="lg"
            color="default"
          >
            <p className="text-base text-black">Product</p>
          </Button>
        </DropdownTrigger>
      </NavbarItem>

      <DropdownMenu
        className="text-base "
        itemClasses={{
          base: 'gap-1',
        }}
      >
        <DropdownItem>
          <Link
            href="/product?category=dog"
            className="grid justify-items-center"
            color="foreground"
          >
            Dog
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href="/product?category=cat"
            className="grid justify-items-center"
            color="foreground"
          >
            Cat
          </Link>
        </DropdownItem>

        <DropdownItem>
          <Link
            href="/product?category=cat"
            className="grid justify-items-center"
            color="foreground"
          >
            Bird
          </Link>
        </DropdownItem>

        <DropdownItem>
          <Link
            href="/product?category=water-animal"
            className="grid justify-items-center"
            color="foreground"
          >
            Water Animal
          </Link>
        </DropdownItem>

        <DropdownItem>
          <Link
            href="/product?category=exotic"
            color="foreground"
            className="grid justify-items-center"
          >
            Exotic
          </Link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
