'use client';

import React, { useState } from 'react';
import { useUserStore } from '@/store/zustand';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import doPostRequest from '@/components/req/req';
import { z } from 'zod';
import InputWithLabel from '@/components/InputWithLabel';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { ClipLoader } from 'react-spinners';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

function Login() {
  const { setUser, setIsAuthenticated } = useUserStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(LoginSchema) });

  const onhandle = async (data: any) => {
    setIsLoading(true);
    console.log('login');
    let result = await doPostRequest(data, '/api/login');
    console.log(result, 'loginasdf');

    if (result.token) {
      Cookies.set('authToken', result.token, { expires: 7 });
      console.log('login', result.token, Cookies.get('authToken'));
      setUser(result);
      setIsAuthenticated(true);
      router.push('/');
    }
    setIsLoading(false);
  };

  return (
    <div className="pt-32 pb-32 flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg flex max-w-4xl w-full">
        <div className="w-1/2 p-8 bg-[#F7931E] text-white rounded-l-lg flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">Hey There!</h1>
          <p className="mb-6">
            Welcome Back. You are just one step away from your feed.
          </p>
          <Link href="/signup">
            <button className="py-2 px-4 bg-[#F15A24] hover:bg-[#F05A28] text-white font-semibold rounded-lg">
              Sign Up
            </button>
          </Link>
        </div>
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">SIGN IN</h2>
          <form onSubmit={handleSubmit(onhandle)}>
            <div className="mb-4">
              <InputWithLabel
                label="Email"
                placeholder="Email"
                form={register('email')}
                error={errors.email}
              />
            </div>
            <div className="mb-6">
              <InputWithLabel
                label="Password"
                placeholder="Password"
                form={register('password')}
                error={errors.password}
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              {/* <Link href="/forgot-password" className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800">
                Forgot Password?
              </Link> */}
            </div>
            <div className="mb-6">
              <button
                className={`w-full bg-[#ED145B] hover:bg-[#D3134A] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <ClipLoader color="#ffffff" size={24} />
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
            <div className="text-center">
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-blue-600">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-blue-400">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-blue-700">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </form>
          <div className="flex justify-center mt-4">
            <h6 className="mr-0.5">
              If you don&apos;t have an account, please{' '}
            </h6>
            <Link href="/signup" className="underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
