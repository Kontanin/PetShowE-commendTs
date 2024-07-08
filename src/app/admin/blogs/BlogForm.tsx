'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BlogPost } from '@/types/blogType';
import doPostRequest from '@/utils/doPostRequest';
import doUpdateRequest from '@/utils/doUpdateRequest';

interface BlogFormProps {
  selectedBlog: BlogPost | null;
  setBlogs: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  setSelectedBlog: React.Dispatch<React.SetStateAction<BlogPost | null>>;
  blogs: BlogPost[];
}

const BlogForm: React.FC<BlogFormProps> = ({ selectedBlog, setBlogs, setSelectedBlog, blogs }) => {
  const [newBlog, setNewBlog] = useState<Partial<BlogPost>>({
    title: '',
    content: '',
    tag: '',
    image: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedBlog) {
      setNewBlog(selectedBlog);
    } else {
      setNewBlog({ title: '', content: '', tag: '', image: '' });
    }
  }, [selectedBlog]);

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

  const handleSubmit = async () => {
    let imageUrl = newBlog.image;

    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await doPostRequest(formData, '/upload');
        imageUrl = response.imageUrl;
      } catch (error) {
        console.error('Error uploading image:', error);
        return;
      }
    }

    const blogData = { ...newBlog, image: imageUrl };

    if (selectedBlog) {
      // Update existing blog
      try {
        const updatedBlog = await doUpdateRequest(blogData, `/api/blogs/${selectedBlog.id}`);
        if (updatedBlog) {
          setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog));
          setSelectedBlog(null);
          setNewBlog({ title: '', content: '', tag: '', image: '' });
          setFile(null);
        }
      } catch (error) {
        console.error('Error updating blog:', error);
      }
    } else {
      // Create new blog
      try {
        const createdBlog = await doPostRequest(blogData, '/api/create-blog');
        if (createdBlog) {
          setBlogs([...blogs, createdBlog]);
          setNewBlog({ title: '', content: '', tag: '', image: '' });
          setFile(null);
        }
      } catch (error) {
        console.error('Error creating blog:', error);
      }
    }
  };

  return (
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
        <div className="w-full mb-2 relative" style={{ height: '300px' }}>
          <Image src={newBlog.image} alt="Uploaded" layout="fill" objectFit="cover" />
        </div>
      )}
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {selectedBlog ? 'Update Blog' : 'Create Blog'}
      </button>
    </div>
  );
};

export default BlogForm;
