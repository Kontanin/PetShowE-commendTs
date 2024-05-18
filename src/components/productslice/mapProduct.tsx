"use client"
import { DropdownItem,Link} from "@nextui-org/react";
import { useState } from "react";
import mockData from './mockData1.json';
import React from 'react'


import Product from "./product";
const o=[{"id":"B3-92-BD-33-BA-DA","productName":"Lentibulariaceae","description ":"randon detail","stock ":1,"unitPrice":354,"image":"https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure-1536x864.webp","freeShipping":true,"company":"Sporer-Gerlach","category":"Kelp gull"},
{"id":"74-C4-4D-89-B0-48","productName":"Zygophyllaceae","description ":"randon detail","stock ":2,"unitPrice":150,"image":"https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure-1536x864.webp","freeShipping":false,"company":"Toy and Sons","category":"Bottle-nose dolphin"},
{"id":"8F-50-CC-EF-E1-9B","productName":"Boraginaceae","description ":"randon detail","stock ":3,"unitPrice":699,"image":"https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure-1536x864.webp","freeShipping":false,"company":"Abbott, Schowalter and Thompson","category":"Robin, kalahari scrub"},
{"id":"78-15-A4-E9-4A-A3","productName":"Asteraceae","description ":"randon detail","stock ":4,"unitPrice":581,"image":"https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure-1536x864.webp","freeShipping":true,"company":"Swift-Powlowski","category":"Galapagos albatross"},

]









export default function MapProduct() {
  const [Order,setOrder]=useState(o)


  const product=Order.slice(0, 4).map((item)=>{
    console.log(item)

    return (
      <div key={item.id}>

        <Product  OneProduc={item}/>

      </div>


    )
  
  
  })

  return (
      <div>{product}    
      <Link href="/cart">more ...{Order.length} in your cart </Link>   

      </div>
  )


}
