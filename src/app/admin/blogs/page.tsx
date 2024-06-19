'use client';

import React, { useState, useEffect } from 'react';
import { BlogPost } from '@/types/blogType';
import axios from 'axios';
import  doPostRequest  from '@/utils/doPostRequest'
import  doUpdateRequest  from '@/utils/doUpdateRequest'
const BlogManagement: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [newBlog, setNewBlog] = useState<Partial<BlogPost>>({
    title: '',
    content: '',
    tag: '',
    image: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch blogs from the backend API
    fetch('/api/blogs')
      .then(response => response.json())
      .then(data => setBlogs(data));
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      if (!['image/jpeg', 'image/png'].includes(selectedFile.type)) {
        setFileError('Only PNG and JPG files are allowed');
        setFile(null);
      } else {
        setFileError(null);
        setFile(selectedFile);
      }
    }
  };

  const handleSave = async () => {
    let imageUrl = newBlog.image;

    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        imageUrl = response.data.imageUrl;
      } catch (error) {
        console.error('Error uploading image:', error);
        return;
      }
    }

    const blogData = { ...newBlog, image: imageUrl };

    if (selectedBlog) {
      // Update existing blog
      const updatedBlog = await doUpdateRequest(blogData, `/api/blogs/${selectedBlog.id}`);
      if (updatedBlog) {
        setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog));
        setSelectedBlog(null);
        setNewBlog({ title: '', content: '', tag: '', image: '' });
        setFile(null);
      }
    } else {
      // Create new blog
      const createdBlog = await doPostRequest(blogData, '/api/blogs');
      if (createdBlog) {
        setBlogs([...blogs, createdBlog]);
        setNewBlog({ title: '', content: '', tag: '', image: '' });
        setFile(null);
      }
    }
  };

  const handleEdit = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setNewBlog(blog);
    setFile(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/blogs/${id}`);
      setBlogs(blogs.filter(blog => blog.id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Blog Management</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">
          {selectedBlog ? 'Edit Blog' : 'Create New Blog'}
        </h3>
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
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={handleFileChange}
          className="w-full mb-2 p-2 border rounded"
        />
        {fileError && <p className="text-red-500 mb-2">{fileError}</p>}
        {newBlog.image && (
          <img src={newBlog.image} alt="Uploaded" className="w-full mb-2" />
        )}
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {selectedBlog ? 'Update Blog' : 'Create Blog'}
        </button>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Existing Blogs</h3>
        {blogs.map(blog => (
          <div key={blog.id} className="border p-4 mb-4 rounded">
            <h4 className="text-lg font-bold">{blog.title}</h4>
            <p className="text-sm text-gray-500">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            <p>{blog.content}</p>
            {blog.image && (
              <img src={blog.image} alt={blog.title} className="w-full mb-2" />
            )}
            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => handleEdit(blog)}
                className="px-4 py-2 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog.id)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
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
