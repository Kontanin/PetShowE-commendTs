
"use client"
import React from 'react'

import { NavbarItem, Link, Button ,DropdownItem, DropdownTrigger, Dropdown, DropdownMenu
} from "@nextui-org/react";
export default function FristPart() {
 
  return (
    <Dropdown>
    <NavbarItem className="w-[70px] ">
      <DropdownTrigger>
        <Button
       
       
          className="bg-transparent  font-bold data-[hover=true]:bg-transparent w-[60px]"

          radius="lg"
          color="default"
        >
          Product
        </Button>
      </DropdownTrigger>
    </NavbarItem>


    <DropdownMenu
      className=""
      itemClasses={{
        base: "gap-4",
      }}
    > 
      <DropdownItem 
      >
        <Link href="/product"className="grid justify-items-center " color="foreground" >
        Dog      
        </Link>

      </DropdownItem>
      <DropdownItem>
        <Link href="/product" className="grid justify-items-center" color="foreground">
        Cat
        </Link>
      </DropdownItem>

      <DropdownItem >
      <Link href="/product" className="grid justify-items-center" color="foreground">
        Bird
        </Link>
      </DropdownItem>

      <DropdownItem>
      <Link href="/product" className="grid justify-items-center" color="foreground">
        Water Animal
        </Link>
      </DropdownItem>

      <DropdownItem   >
      <Link href="/product"color="foreground" className="grid justify-items-center">
        Exotic Animal
        </Link>
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>

  )
}
