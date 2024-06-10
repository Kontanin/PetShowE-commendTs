'use client';
import { useState } from 'react';

export const AddressEdit = () => {
  const [formData, setFormData] = useState({
    address: '',
    subdistrict: '',
    country: '',
    zipcode: '',
    city: '',
    phone: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex justify-start items-center  bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">My Adress</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="subdistrict"
            >
              Subdistrict
            </label>
            <input
              type="text"
              id="subdistrict"
              name="subdistrict"
              value={formData.subdistrict}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="country"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="zipcode"
            >
              Zipcode
            </label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="city"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="md:col-span-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
