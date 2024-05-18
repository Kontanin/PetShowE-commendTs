import React from 'react'
import { NavbarContent, NavbarItem, Link, Button,Popover , PopoverTrigger, PopoverContent,Badge
} from "@nextui-org/react";
import {BsBag} from 'react-icons/bs';

import  MapProduct from '@/components/productslice/mapProduct';

import Profile from '@/components/Profile';

export default function Lastpart() {
  let y=false
  return (
    <NavbarContent justify="end" >
  
    <Popover placement="bottom" >
      <PopoverTrigger >
            <Button   className='bg-red-500'> 
            <Badge content="5" color="primary"   placement="bottom-right">
            <BsBag size={30}/>
            </Badge>

            </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Link href="/cart">Buy Now</Link>
    <MapProduct></MapProduct>

      </PopoverContent>
    
    </Popover>

    {y&&<div>
      <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <Button as={Link}  href="#" variant="flat">
            Sign Up
          </Button>
    </div> 
        }
{!y&&<Profile/>}

    

      </NavbarContent>
  )
}
