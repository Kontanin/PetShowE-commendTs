'use client';
import React, { useState } from 'react';
import FormSubmitButton from '@/components/FormSubmitButton';
import { Textarea, Input } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/react';

function HelpFeedback() {
  const choose = [
    { value: '1', label: 'Help' },
    { value: '2', label: 'Feedback' },
  ];
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
    <div className="flex flex-col w-1/2">
      <h1 className="mb-3 text-lg font-bold">Help& feedback</h1>
      <form onSubmit={handle}>
        <label htmlFor="wer">
          E-mail
          <span className="text-red-500">*</span>
        </label>
        <Input
          isRequired
          isDisabled
          type="email"
          defaultValue="junior@nextui.org"
          className="max-w-full"
        />
        <label htmlFor="Topic">
          Topic
          <span className="text-red-500">*</span>
        </label>
        <Select
          isRequired
          items={choose}
          placeholder="Select an Topic"
          className="max-w-full"
        >
          {choose => <SelectItem key={choose.value}>{choose.label}</SelectItem>}
        </Select>

        {/* <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input-bordered input mb-3 w-full"
        /> */}
        <Textarea
          isRequired
          label="Description"
          labelPlacement="outside"
          placeholder="Enter your description"
          className="max-w-full"
        />
        <div className="flex flex-col">
          <input type="file" onChange={handleFileChange} />
          <FormSubmitButton className="btn-block">Send</FormSubmitButton>
        </div>
      </form>
    </div>
  );
}

export default HelpFeedback;
