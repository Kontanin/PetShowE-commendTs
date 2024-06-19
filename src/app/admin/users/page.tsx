'use client';

import React, { useState } from 'react';
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import doUpdateRequest from '@/utils/doUpdateRequest';
import doDeleteRequest from '@/utils/doDeleteRequest';
import Link from 'next/link';
const UserManagement: React.FC = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', role: 'User' },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [userForm, setUserForm] = useState({ name: '', email: '', role: '' });
  const [error, setError] = useState<string | null>(null);

  const handleEdit = (id: number) => {
    const userToEdit = users.find(user => user.id === id);
    if (userToEdit) {
      setIsEditing(true);
      setEditUserId(id);
      setUserForm({ name: userToEdit.name, email: userToEdit.email, role: userToEdit.role });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const result = await doDeleteRequest(`/api/users/${id}`);
      if (result) {
        setUsers(users.filter(user => user.id !== id));
        setError(null);
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditing && editUserId !== null) {
      try {
        const result = await doUpdateRequest(userForm, `/api/edit-profile/${editUserId}`);
        if (result) {
          setUsers(users.map(user => (user.id === editUserId ? result : user)));
          setIsEditing(false);
          setEditUserId(null);
          setUserForm({ name: '', email: '', role: '' });
          setError(null);
        } else {
          setError('Failed to update user');
        }
      } catch (err) {

          setError('Failed to update user');

      }
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>
        <Link href="/admin">admin
        </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
      
        <Link href="/admin/users">users
        </Link></BreadcrumbItem>
      </Breadcrumbs>

      <h2 className="text-3xl font-bold mb-6">User Management</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="name"
          value={userForm.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-lg"
        />
        <input
          type="email"
          name="email"
          value={userForm.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="role"
          value={userForm.role}
          onChange={handleInputChange}
          placeholder="Role"
          className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {'Update User'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">ID</th>
            <th className="py-2 px-4 border-b border-gray-200">Name</th>
            <th className="py-2 px-4 border-b border-gray-200">Email</th>
            <th className="py-2 px-4 border-b border-gray-200">Role</th>
            <th className="py-2 px-4 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b border-gray-200">{user.id}</td>
              <td className="py-2 px-4 border-b border-gray-200">{user.name}</td>
              <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
              <td className="py-2 px-4 border-b border-gray-200">{user.role}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
