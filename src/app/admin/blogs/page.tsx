'use client';

import React, { useState, useEffect } from 'react';
import { BlogPost } from '@/types/blogType';
import doPostRequest from '@/utils/doPostRequest';
import BlogForm from './BlogForm';
import BlogList from './BlogList';

const BlogManagement: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([
    // Mock data
    {
      id: '1',
      title: 'Sample Blog 1',
      content: 'This is a sample blog post.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tag: 'sample',
      userId: 'user1',
      username: 'User One',
      image: ''
    },
    {
      id: '2',
      title: 'Sample Blog 2',
      content: 'This is another sample blog post.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tag: 'sample',
      userId: 'user2',
      username: 'User Two',
      image: ''
    }
  ]);
  console
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string | null>(null);
// gpt write it wrong
  // useEffect(() => {
  //   // Fetch blogs from the backend API
  //   doPostRequest({}, '/api/blogs')
  //     .then(data => setBlogs(data))
  //     .catch(error => {
  //       console.error('Error fetching blogs:', error);
  //       setError('Failed to fetch blogs. Please try again later.');
  //     });
  // }, []);

  
  const handleEdit = (blog: BlogPost) => {
    setSelectedBlog(blog);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Blog Management</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <BlogForm
        selectedBlog={selectedBlog}
        setBlogs={setBlogs}
        setSelectedBlog={setSelectedBlog}
        blogs={blogs}
      />
      <BlogList
        blogs={[]}
        handleEdit={handleEdit}
        setBlogs={setBlogs}
      />
    </div>
  );
};

export default BlogManagement;
