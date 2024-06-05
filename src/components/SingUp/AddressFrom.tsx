import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form';
import { Step2Errors } from '@/utils/schemasSigUp';

type AddressFormProps = {
  errors: FieldErrors<Step2Errors>;
};

export const AddressForm = ({ errors }: AddressFormProps) => {
  const { register } = useFormContext();

  return (
    <>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="address"
        >
          Address
        </label>
        <input
          {...register('address')}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="address"
          type="text"
          placeholder="Address"
        />
        {errors.address && (
          <p className="text-red-500 text-xs italic">
            {String(errors.address.message)}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="subdistrict"
        >
          Subdistrict
        </label>
        <input
          {...register('subdistrict')}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="subdistrict"
          type="text"
          placeholder="Subdistrict"
        />
        {errors.subdistrict && (
          <p className="text-red-500 text-xs italic">
            {String(errors.subdistrict.message)}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="country"
        >
          Country
        </label>
        <input
          {...register('country')}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="country"
          type="text"
          placeholder="Country"
        />
        {errors.country && (
          <p className="text-red-500 text-xs italic">
            {String(errors.country.message)}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="zipcode"
        >
          Zipcode
        </label>
        <input
          {...register('zipcode')}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="zipcode"
          type="number"
          placeholder="Zipcode"
        />
        {errors.zipcode && (
          <p className="text-red-500 text-xs italic">
            {String(errors.zipcode.message)}
          </p>
        )}
      </div>
    </>
  );
};
