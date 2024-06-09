'use client';
import React from 'react';

const UserManagement: React.FC = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael@example.com',
      role: 'User',
    },
  ];

  const handleEdit = (id: number) => {
    // Handle edit user logic
    console.log(`Edit user with id: ${id}`);
  };

  const handleDelete = (id: number) => {
    // Handle delete user logic
    console.log(`Delete user with id: ${id}`);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">User Management</h2>
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
              <td className="py-2 px-4 border-b border-gray-200">
                {user.name}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {user.email}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {user.role}
              </td>
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
