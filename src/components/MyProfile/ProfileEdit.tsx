'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import doUpdateRequest from '@/utils/doUpdateRequest';
import { UserStore } from '@/store/UserStore';

export const ProfileEdit = () => {
  const { id } = UserStore();
  const initialProfile = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Software developer at XYZ Company.',
    image: '', // Initial image URL or base64 string
    phone: '', // Initial phone number
  };

  const [profile, setProfile] = useState(initialProfile);
  const [isChanged, setIsChanged] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    // Check if the current profile is different from the initial profile
    const hasChanges =
      profile.name !== initialProfile.name ||
      profile.email !== initialProfile.email ||
      profile.bio !== initialProfile.bio ||
      profile.image !== initialProfile.image ||
      profile.phone !== initialProfile.phone;

    setIsChanged(hasChanges);
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFile(selectedFile);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(profile).forEach(([key, value]) => {
      formDataToSend.append(key, value as string);
    });
    if (file) {
      formDataToSend.append('image', file);
    }
    const result = await doUpdateRequest(formDataToSend, `/api/edit-profile/${id}`);
    if (result) {
      console.log('Profile updated successfully', result);
    } else {
      console.error('Failed to update profile');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg flex w-full">
      <div className="w-2/3 pr-8">
        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ${!isChanged && 'opacity-50 cursor-not-allowed'}`}
            disabled={!isChanged}
          >
            Save Changes
          </button>
        </form>
      </div>
      <div className="w-1/3 text-center flex flex-col items-center justify-center">
        {imagePreview ? (
          <Image
            src={imagePreview as string}
            alt="Profile Image"
            width={200}
            height={200}
            className="w-96 h-96 overflow-hidden mb-4 rounded-full shadow-lg"
          />
        ) : (
          <Image
            src="/mnt/data/image.png"
            alt="Profile Image"
            width={200}
            height={200}
            className="w-96 h-96 overflow-hidden mb-4 rounded-full shadow-lg"
          />
        )}
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>
    </div>
  );
};
