'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step1Schema, step2Schema, step3Schema } from '@/utils/schemasSigUp';

type FormData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  subdistrict: string;
  country: string;
  zipcode: number;
};

const SignUp = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const schema = step === 1 ? step1Schema : step === 2 ? step2Schema : step3Schema;
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const formData = watch(); // Watch form data

  const nextStep = (e: any) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const prevStep = (e: any) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const onSubmit = (data: FormData) => {
    console.log('Form submitted', data);
  };

  const isStep2Complete = formData.address && formData.subdistrict && formData.country && formData.zipcode;

  return (
    <div className="pt-32 pb-32 flex items-center justify-center bg-white">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        <div className="text-center mb-4">
          <span className="font-semibold">{step}/{totalSteps}</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">
                  First Name
                </label>
                <input
                  {...register('firstname')}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="firstname"
                  type="text"
                  placeholder="First Name"
                />
                {errors.firstname && <p className="text-red-500 text-xs italic">{errors.firstname.message as string}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
                  Last Name
                </label>
                <input
                  {...register('lastname')}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="lastname"
                  type="text"
                  placeholder="Last Name"
                />
                {errors.lastname && <p className="text-red-500 text-xs italic">{errors.lastname.message as string}</p>}
              </div>
              <div className="flex justify-between">
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={nextStep}
                >
                  Next
                </button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  {...register('address')}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="address"
                  type="text"
                  placeholder="Address"
                />
                {errors.address && <p className="text-red-500 text-xs italic">{errors.address.message as string}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subdistrict">
                  Subdistrict
                </label>
                <input
                  {...register('subdistrict')}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="subdistrict"
                  type="text"
                  placeholder="Subdistrict"
                />
                {errors.subdistrict && <p className="text-red-500 text-xs italic">{errors.subdistrict.message as string}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                  Country
                </label>
                <input
                  {...register('country')}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="country"
                  type="text"
                  placeholder="Country"
                />
                {errors.country && <p className="text-red-500 text-xs italic">{errors.country.message as string}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zipcode">
                  Zipcode
                </label>
                <input
                  {...register('zipcode', { valueAsNumber: true })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="zipcode"
                  type="number"
                  placeholder="Zipcode"
                />
                {errors.zipcode && <p className="text-red-500 text-xs italic">{errors.zipcode.message as string}</p>}
              </div>
              <div className="flex justify-between">
                <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={prevStep}>
                  Previous
                </button>
                <button className={`bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`} type="button" onClick={nextStep}>
                  {isStep2Complete ? 'Next' : 'Skip'}
                </button>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  {...register('email')}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  required
                />
                {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message as string}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  {...register('password')}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                />
                {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message as string}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  {...register('confirmPassword')}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  required
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword.message as string}</p>}
              </div>
              <div className="flex justify-between">
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={prevStep}
                >
                  Previous
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                                   Submit
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;

