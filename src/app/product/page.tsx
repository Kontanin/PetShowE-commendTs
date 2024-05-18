import React from 'react';
import ProductList from './productList';
function page() {
  return (


  <div className=" ">
    <h1 className="text-4xl font-bold text-start text-gray-700 my-3">Product</h1>
    <div className='flex flex-row'>
    <div className="w-1/6 ">

      <div className="flex items-center">
        <input
          type="radio"
          className="form-radio text-indigo-600"
          name="radio"
          id="radio1"
        />
        <label className="ml-2">Option 1</label>
      </div>

      <div className="flex items-center">
        <input
                type="radio"
                className="form-radio text-indigo-600"
                name="radio"
                id="radio2"
        />
        <label className="ml-2">Option 2</label>
      </div>
    </div>

    <div className="w-5/6 border-2 border-rose-60 h">

      <div className="flex flex-wrap "><ProductList/></div>
    </div>

    </div>
  </div>

  );
}

export default page;
