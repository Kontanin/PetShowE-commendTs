// AddressList.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Address {
  id: number;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

const initialAddresses: Address[] = [
  {
    id: 1,
    name: 'Home',
    street: '123 Main St',
    city: 'Springfield',
    state: 'IL',
    zip: '62701',
    country: 'USA',
  },
  {
    id: 2,
    name: 'Work',
    street: '456 Elm St',
    city: 'Springfield',
    state: 'IL',
    zip: '62702',
    country: 'USA',
  },
];

export const AddressList1: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);

  const handleAddAddress = () => {
    const newAddress: Address = {
      id: addresses.length + 1,
      name: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    };
    setCurrentAddress(newAddress);
    setIsEditing(true);
  };

  const handleEditAddress = (address: Address) => {
    setCurrentAddress(address);
    setIsEditing(true);
  };

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter(address => address.id !== id));
  };

  const handleSaveAddress = () => {
    if (currentAddress) {
      if (currentAddress.id <= addresses.length) {
        setAddresses(addresses.map(address => (address.id === currentAddress.id ? currentAddress : address)));
      } else {
        setAddresses([...addresses, currentAddress]);
      }
      setIsEditing(false);
      setCurrentAddress(null);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (currentAddress) {
      setCurrentAddress({
        ...currentAddress,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSaveAddress();
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Manage Addresses</h2>
      <button
        onClick={handleAddAddress}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 mb-4"
      >
        Add New Address
      </button>
      {addresses.map(address => (
        <div key={address.id} className="mb-4 p-4 border border-gray-300 rounded-lg flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">{address.name}</h3>
            <p>{address.street}</p>
            <p>{address.city}, {address.state} {address.zip}</p>
            <p>{address.country}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleEditAddress(address)}
              className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteAddress(address.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {isEditing && currentAddress && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">{currentAddress.id <= addresses.length ? 'Edit Address' : 'Add Address'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={currentAddress.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="street">
                Street
              </label>
              <input
                type="text"
                id="street"
                name="street"
                value={currentAddress.street}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={currentAddress.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={currentAddress.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zip">
                ZIP
              </label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={currentAddress.zip}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={currentAddress.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Save Address
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
