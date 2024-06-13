'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import FormSubmitButton from '@/components/Form/FormSubmitButton';
import InputWithLabel from '@/components/Form/InputWithLabel';
import { Textarea, Input } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/react';
import doPostRequest from '@/utils/doPostRequest';

const choose = [
  { value: '1', label: 'Help' },
  { value: '2', label: 'Feedback' },
];

const HelpFeedback: React.FC = () => {
  const [formData, setFormData] = useState({
    email: 'junior@nextui.org',
    topic: '',
    description: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append('email', formData.email);
    payload.append('topic', formData.topic);
    payload.append('description', formData.description);
    if (file) {
      payload.append('file', file);
    }

    try {
      const response = await doPostRequest(payload, '/api/help-feedback');
      if (response) {
        window.location.reload(); 
      } else {
        setErrorMessage('Submission failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="pt-32 pb-32 flex items-center justify-center bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Help & Feedback</h1>
        <form onSubmit={handleSubmit}>
          <InputWithLabel
            label="E-mail"
            placeholder="E-mail"
            form={{
              name: 'email',
              value: formData.email,
              onChange: handleChange,
            }}
            type="email"
            error={{ message: '' }}
          />
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Topic
              <span className="text-red-500">*</span>
            </label>
            <Select
              isRequired
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="Select a Topic"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              {choose.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
              <span className="text-red-500">*</span>
            </label>
            <Textarea
              isRequired
              placeholder="Enter your description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Attach File
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          {errorMessage && (
            <div className="mb-4 text-red-600">{errorMessage}</div>
          )}
          <FormSubmitButton className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Send
          </FormSubmitButton>
        </form>
      </div>
    </div>
  );
};

export default HelpFeedback;
