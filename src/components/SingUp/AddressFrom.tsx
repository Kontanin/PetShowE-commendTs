import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form';
import { Step2Errors } from '@/utils/schemasSigUp';
import InputWithLabel from '@/components/Form/InputWithLabel';

type AddressFormProps = {
  errors: FieldErrors<Step2Errors>;
};

export const AddressForm = ({ errors }: AddressFormProps) => {
  const { register } = useFormContext();

  return (
    <>
      <InputWithLabel
        label="Address"
        placeholder="Address"
        form={register('address')}
        error={errors.address}
      />
      <InputWithLabel
        label="Subdistrict"
        placeholder="Subdistrict"
        form={register('subdistrict')}
        error={errors.subdistrict}
      />
      <div className="flex space-x-4">
        <div className="w-1/2">
          <InputWithLabel
            label="Country"
            placeholder="Country"
            form={register('country')}
            error={errors.country}
          />
        </div>
        <div className="w-1/2">
          <InputWithLabel
            label="Zipcode"
            placeholder="Zipcode"
            form={register('zipcode', { setValueAs: v => v === "" ? undefined : parseInt(v) })}
            error={errors.zipcode}
          />
        </div>
      </div>
    </>
  );
};

