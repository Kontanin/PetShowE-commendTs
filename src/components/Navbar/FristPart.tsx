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

const dropdownItems = [
  { key: 'dog', href: '/product?category=dog', label: 'Dog' },
  { key: 'cat', href: '/product?category=cat', label: 'Cat' },
  { key: 'bird', href: '/product?category=bird', label: 'Bird' },
  { key: 'water-animal', href: '/product?category=water-animal', label: 'Water Animal' },
  { key: 'exotic', href: '/product?category=exotic', label: 'Exotic' },
];

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
        {dropdownItems.map(item => (
          <DropdownItem key={item.key}>
            <Link
              href={item.href}
              className="grid justify-items-center"
              color="foreground"
            >
              {item.label}
            </Link>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
