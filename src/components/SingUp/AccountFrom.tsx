import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form';
import { Step3Errors } from '@/utils/schemasSigUp';

type AccountFormProps = {
  errors: FieldErrors<Step3Errors>;
};

export const AccountForm = ({ errors }: AccountFormProps) => {
  const { register } = useFormContext();

  return (
    <>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          {...register('email')}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-red-500 text-xs italic">
            {String(errors.email.message)}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          {...register('password')}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500 text-xs italic">
            {String(errors.password.message)}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="confirmPassword"
        >
          Confirm Password
        </label>
        <input
          {...register('confirmPassword')}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs italic">
            {String(errors.confirmPassword.message)}
          </p>
        )}
      </div>
    </>
  );
};
