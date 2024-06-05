import React, { useState, useEffect } from 'react';

export  const ProfileEdit = () => {
  const initialProfile = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Software developer at XYZ Company.'
  };

  const [profile, setProfile] = useState(initialProfile);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    // Check if the current profile is different from the initial profile
    const hasChanges =
      profile.name !== initialProfile.name ||
      profile.email !== initialProfile.email ||
      profile.bio !== initialProfile.bio;

    setIsChanged(hasChanges);
  }, [profile]);

  const handleChange = (e :any) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Here you can handle the form submission, e.g., send data to the server.
    console.log('Profile updated:', profile);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
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
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ${!isChanged && 'opacity-50 cursor-not-allowed'}`}
          disabled={!isChanged}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

