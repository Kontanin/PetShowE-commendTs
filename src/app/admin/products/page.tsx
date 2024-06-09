'use client';
import React, { useState } from 'react';
import FormSubmitButton from '@/components/Form/FormSubmitButton';

export default function AddProductPage() {
  const [file, setFile] = useState<File | null>(null);

  const handle = async (e: React.FormEvent) => {
    console.log('file', e);
    e.preventDefault(); // Prevents the default form submission behavior
    // Handle form submission here
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    // Log the name and price values
    console.log('Name:', formData.get('name'));
    console.log('Price:', formData.get('price'));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form onSubmit={handle}>
        <input
          required
          name="name"
          placeholder="Name"
          className="input-bordered input mb-3 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea-bordered textarea mb-3 w-full"
        />
        {/* <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input-bordered input mb-3 w-full"
        /> */}
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input-bordered input mb-3 w-full"
        />
        <input type="file" onChange={handleFileChange} />
        <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
      </form>
    </div>
  );
}
