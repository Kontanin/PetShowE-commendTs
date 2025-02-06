'use client';
import React, { useState, useEffect } from 'react';
import FormSubmitButton from '@/components/Form/FormSubmitButton';
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import doPostRequest from '@/utils/doPostRequest';
import doUpdateRequest from '@/utils/doUpdateRequest';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
};

const AddProductPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>({
    id: '',
    name: '',
    description: '',
    price: 0
  });
  // const [userId, setUserId] = useState<string>(''); // Assume we get this from the context or props

  useEffect(() => {
    // Fetch products from backend API
    fetch('/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setSearchTerm('');
    setFilteredProducts(products);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (selectedProduct) {
      const { name, value } = e.target;
      setSelectedProduct({
        ...selectedProduct,
        [name]: value
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) {
      return;
    }

    const formData = new FormData();
    formData.append('name', selectedProduct.name);
    formData.append('description', selectedProduct.description);
    formData.append('price', selectedProduct.price.toString());
    if (file) {
      formData.append('image', file);
    }

    try {
      if (selectedProduct.id) {
        const response = await doUpdateRequest(formData, `/api/products/${selectedProduct.id}`);
        alert('Product updated successfully');
        // Update local state
        const updatedProducts = products.map(product => 
          product.id === selectedProduct.id ? response : product
        );
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
      } else {
        const response = await doPostRequest(formData, '/api/products');
        alert('Product added successfully');
        setProducts([...products, response]);
        setFilteredProducts([...products, response]);
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Admin Pages</BreadcrumbItem>
        <BreadcrumbItem>Products</BreadcrumbItem>
      </Breadcrumbs>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search product"
          value={searchTerm}
          onChange={handleSearchChange}
          className="input-bordered input w-full"
        />
        {searchTerm && (
          <ul className="border p-2 mt-2 rounded shadow">
            {filteredProducts.map(product => (
              <li
                key={product.id}
                onClick={() => handleSelectProduct(product)}
                className="cursor-pointer hover:bg-gray-100 p-2"
              >
                {product.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedProduct && (
        <form onSubmit={handleSubmit}>
          <input
            required
            name="name"
            placeholder="Name"
            value={selectedProduct.name}
            onChange={handleInputChange}
            className="input-bordered input mb-3 w-full"
          />
          <textarea
            required
            name="description"
            placeholder="Description"
            value={selectedProduct.description}
            onChange={handleInputChange}
            className="textarea-bordered textarea mb-3 w-full"
          />
          <input
            required
            name="price"
            placeholder="Price"
            type="number"
            value={selectedProduct.price}
            onChange={handleInputChange}
            className="input-bordered input mb-3 w-full"
          />
          <input type="file" onChange={handleFileChange} />
          <FormSubmitButton className="btn-block">{selectedProduct.id ? 'Update Product' : 'Add Product'}</FormSubmitButton>
        </form>
      )}
    </div>
  );
};

export default AddProductPage;
