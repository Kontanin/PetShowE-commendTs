'use client';

import React, { useState } from 'react';
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import  doPostRequest  from '@/utils/doPostRequest'
import  doUpdateRequest  from '@/utils/doUpdateRequest'

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', role: 'User' },
  ]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSave = async () => {
    if (isEditing && editUserId !== null) {
      const updatedUser = await doUpdateRequest(newUser, `/api/users/${editUserId}`);
      if (updatedUser) {
        setUsers(users.map(user => (user.id === editUserId ? updatedUser : user)));
        setIsEditing(false);
        setEditUserId(null);
      }
    } else {
      const createdUser = await doPostRequest(newUser, '/api/users');
      if (createdUser) {
        setUsers([...users, createdUser]);
      }
    }
    setNewUser({ name: '', email: '', role: '' });
  };

  const handleEdit = (id: number) => {
    const userToEdit = users.find(user => user.id === id);
    if (userToEdit) {
      setNewUser(userToEdit);
      setIsEditing(true);
      setEditUserId(id);
    }
  };

  const handleDelete = async (id: number) => {
    // Handle delete user logic
    console.log(`Delete user with id: ${id}`);
  };

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Admin</BreadcrumbItem>
        <BreadcrumbItem>Users</BreadcrumbItem>
      </Breadcrumbs>

      <h2 className="text-3xl font-bold mb-6">User Management</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">
          {isEditing ? 'Edit User' : 'Create New User'}
        </h3>
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          name="role"
          value={newUser.role}
          onChange={handleInputChange}
          placeholder="Role"
          className="w-full mb-2 p-2 border rounded"
        />
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isEditing ? 'Update User' : 'Create User'}
        </button>
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
          {users.map(user => (
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
