'use client'

import {useUserStore } from "@/store/zustand";

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'
import doPostRequest from '@/components/req';
import { z } from 'zod';
import InputWithLabel from '@/components/InputWithLabel';
import { zodResolver } from '@hookform/resolvers/zod';


import { url } from 'inspector';
function Login() {
  const {setUSer} = useUserStore()
  const router = useRouter();
  const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });
  
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(LoginSchema) });

  const onhandle = async (data:any) => {
    let result = await doPostRequest(data, '/api/login');
    console.log(result,"login");
    
    if (result) {
      setUSer(result);
      router.push('/')
    }
  };

  return (
    <div className="h-screen flex items-center justify-center rounded-lg  ">
      <div className="bg-orange-500 rounded-lg   text-zinc-50">
        <h1 className="flex items-center justify-center">login</h1>
        <div className="bg-stone-400 rounded-lg">
          <form onSubmit={handleSubmit(onhandle)}>
            <div className="flex flex-col bg-stone-50 border text-black">
              <InputWithLabel
                label={'email'}
                placeholder={'email'}
                error={errors?.email}
                form={register('email')}
              />

              <InputWithLabel
                label={'password'}
                placeholder={'password'}
                error={errors?.password}
                form={register('password')}
              />
            </div>

            <div className="flex content-center justify-center  w-25 bg-stone-50 border text-zinc-50">
              <button className="content-center w-32 bg-red-400 rounded-lg ">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="flex content-center  justify-center">
          <h6 className="mr-1">if you don&apos;t have account please </h6>
          <Link href="/Register" className="flex justify-center underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;