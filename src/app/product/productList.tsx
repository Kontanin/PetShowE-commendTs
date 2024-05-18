import React from "react";

import Image from "next/image";
import Link from 'next/link'; //
import product from "./mockData.json"




export default function ProductList() {
  if (product.length === 0) return (<div></div>);

  return (
    <div className="bg-gray-100">

      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-items-start w-fit ml-1.5">
          {product.map(item =>  {
            if (!item || !item.id||!item.productName||!item.unitPrice||!item.image) {
              return null; // Skip rendering if item or item.id is undefined
            }

            return (
              <Link href={`/product/${item.id}`} key={item.id}>
              <div key={item.id || 0} className="max-w-56 lg:mb-0 mb-8 mx-1.5">
                <div>
                  <Image src="/product/1.jpg" alt={item.productName} width={300} height={100} />
                </div>
                <div className="bg-white">
                  <div className="flex items-center justify-between px-4 pt-4">
                    <div>
                      {/* ... */}
                    </div>
                  </div>
                  <div className="px-4 pb-2">
                    <div className="flex items-center flex-col">
                      <h2 className="text-lg font-semibold">{item.productName}</h2>
                      <p className="text-xs text-gray-600 pl-4">{"฿ "+item.unitPrice}</p>
                    </div>
                    {/* ... */}
                  </div>
                </div>
              </div>
              </Link>
            );
          })}
        </div>
      </div>

    </div>
  );
}