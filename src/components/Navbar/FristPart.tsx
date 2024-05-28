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
            <p className="text-base text-fuchsia-950">Product</p>
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
            href="/product/dog"
            className="grid justify-items-center"
            color="foreground"
          >
            Dog
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href="/product/cat"
            className="grid justify-items-center"
            color="foreground"
          >
            Cat
          </Link>
        </DropdownItem>

        <DropdownItem>
          <Link
            href="/product/bird"
            className="grid justify-items-center"
            color="foreground"
          >
            Bird
          </Link>
        </DropdownItem>

        <DropdownItem>
          <Link
            href="/product/water-animal"
            className="grid justify-items-center"
            color="foreground"
          >
            Water Animal
          </Link>
        </DropdownItem>

        <DropdownItem>
          <Link
            href="/product/exotic"
            color="foreground"
            className="grid justify-items-center"
          >
            Exotic Animal
          </Link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
