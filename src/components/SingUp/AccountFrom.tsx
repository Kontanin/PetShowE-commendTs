import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form';
import { Step3Errors } from '@/utils/schemasSigUp';
import InputWithLabel from '@/components/Form/InputWithLabel';

type AccountFormProps = {
  errors: FieldErrors<Step3Errors>;
};

export const AccountForm = ({ errors }: AccountFormProps) => {
  const { register } = useFormContext();

  return (
    <>
      <InputWithLabel
        label="Email"
        placeholder="Email"
        form={register('email')}
        error={errors.email}
      />
      <InputWithLabel
        label="Password"
        placeholder="Password"
        form={register('password')}
        error={errors.password}
        type="password"
      />
      <InputWithLabel
        label="Confirm Password"
        placeholder="Confirm Password"
        form={register('confirmPassword')}
        error={errors.confirmPassword}
        type="password"
      />
    </>
  );
};
