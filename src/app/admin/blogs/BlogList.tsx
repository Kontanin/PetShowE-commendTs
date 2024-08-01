'use client';

import React from 'react';
import Image from 'next/image';
import { BlogPost } from '@/types/blogType';
import doDeleteRequest from '@/utils/doDeleteRequest';

interface BlogListProps {
  blogs: BlogPost[];
  handleEdit: (blog: BlogPost) => void;
  setBlogs: React.Dispatch<React.SetStateAction<BlogPost[]>>;
}

const BlogList: React.FC<BlogListProps> = ({ blogs, handleEdit, setBlogs }) => {
  const handleDelete = async (id: string) => {
    const result = await doDeleteRequest(`/api/blogs/${id}`);
    if (result) {
      setBlogs(blogs.filter(blog => blog.id !== id));
    } else {
      console.error('Failed to delete blog');
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Existing Blogs</h3>
      {blogs.length === 0 ? (
        <p className="text-gray-500">No blogs available.</p>
      ) : (
        blogs.map(blog => (
          <div key={blog.id} className="border p-4 mb-4 rounded">
            <h4 className="text-lg font-bold">{blog.title}</h4>
            <p className="text-sm text-gray-500">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            <p>{blog.content}</p>
            {blog.image && (
              <div className="w-full mb-2 relative" style={{ height: '300px' }}>
                <Image src={blog.image} alt={blog.title} layout="fill" objectFit="cover" />
              </div>
            )}
            <p className="text-sm text-gray-500">Tag: {blog.tag}</p>
            <p className="text-sm text-gray-500">Author: {blog.username}</p>
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
        ))
      )}
    </div>
  );
};

export default BlogList;
