'use client';

import React, { useState, useEffect } from 'react';
import { BlogPost } from '@/types/blogType';

const BlogManagement: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [newBlog, setNewBlog] = useState<Partial<BlogPost>>({
    title: '',
    content: '',
    tag: '',
    image: '',
  });

  useEffect(() => {
    // Fetch blogs from the backend API
    fetch('/api/blogs')
      .then((response) => response.json())
      .then((data) => setBlogs(data));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleSave = () => {
    if (selectedBlog) {
      // Update existing blog
      fetch(`/api/blogs/${selectedBlog.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog),
      })
        .then((response) => response.json())
        .then((updatedBlog) => {
          setBlogs(blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)));
          setSelectedBlog(null);
          setNewBlog({ title: '', content: '', tag: '', image: '' });
        });
    } else {
      // Create new blog
      fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog),
      })
        .then((response) => response.json())
        .then((createdBlog) => {
          setBlogs([...blogs, createdBlog]);
          setNewBlog({ title: '', content: '', tag: '', image: '' });
        });
    }
  };

  const handleEdit = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setNewBlog(blog);
  };

  const handleDelete = (id: string) => {
    fetch(`/api/blogs/${id}`, { method: 'DELETE' })
      .then(() => setBlogs(blogs.filter((blog) => blog.id !== id)));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Blog Management</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{selectedBlog ? 'Edit Blog' : 'Create New Blog'}</h3>
        <input
          type="text"
          name="title"
          value={newBlog.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          name="content"
          value={newBlog.content}
          onChange={handleInputChange}
          placeholder="Content"
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          name="tag"
          value={newBlog.tag}
          onChange={handleInputChange}
          placeholder="Tag"
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          name="image"
          value={newBlog.image}
          onChange={handleInputChange}
          placeholder="Image URL"
          className="w-full mb-2 p-2 border rounded"
        />
        <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
          {selectedBlog ? 'Update Blog' : 'Create Blog'}
        </button>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Existing Blogs</h3>
        {blogs.map((blog) => (
          <div key={blog.id} className="border p-4 mb-4 rounded">
            <h4 className="text-lg font-bold">{blog.title}</h4>
            <p className="text-sm text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</p>
            <p>{blog.content}</p>
            <div className="flex space-x-4 mt-2">
              <button onClick={() => handleEdit(blog)} className="px-4 py-2 bg-yellow-500 text-white rounded">
                Edit
              </button>
              <button onClick={() => handleDelete(blog.id)} className="px-4 py-2 bg-red-500 text-white rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogManagement;
