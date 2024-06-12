import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form';
import { Step1Errors } from '@/utils/schemasSigUp';
import InputWithLabel from '@/components/Form/InputWithLabel';

type UserFormProps = {
  errors: FieldErrors<Step1Errors>;
};

export const UserForm = ({ errors }: UserFormProps) => {
  const { register } = useFormContext();

  return (
    <>
      <InputWithLabel
        label="First Name"
        placeholder="First Name"
        form={register('firstname')}
        error={errors.firstname}
      />
      <InputWithLabel
        label="Last Name"
        placeholder="Last Name"
        form={register('lastname')}
        error={errors.lastname}
      />
    </>
  );
};
