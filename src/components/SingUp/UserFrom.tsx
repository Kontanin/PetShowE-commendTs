import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form';
import { Step1Errors } from '@/utils/schemasSigUp';

type UserFormProps = {
  errors: FieldErrors<Step1Errors>;
};

export const UserForm = ({ errors }: UserFormProps) => {
  const { register } = useFormContext();

  return (
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
        {errors.firstname && <p className="text-red-500 text-xs italic">{String(errors.firstname.message)}</p>}
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
        {errors.lastname && <p className="text-red-500 text-xs italic">{String(errors.lastname.message)}</p>}
      </div>
    </>
  );
};
