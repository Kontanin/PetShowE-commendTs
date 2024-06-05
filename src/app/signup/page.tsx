'use client';
import React, { useState } from 'react';
import { useForm, FormProvider, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  step1Schema,
  step2Schema,
  step3Schema,
  Step1Errors,
  Step2Errors,
  Step3Errors,
} from '@/utils/schemasSigUp';
import { UserForm } from '@/components/SingUp/UserFrom';
import { AddressForm } from '@/components/SingUp/AddressFrom';
import { AccountForm } from '@/components/SingUp/AccountFrom';

const SignUp = () => {
  const [step, setStep] = useState(1);

  const schema =
    step === 1 ? step1Schema : step === 2 ? step2Schema : step3Schema;
  const methods = useForm({
    resolver: zodResolver(schema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const nextStep = (e: any) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const prevStep = (e: any) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const onSubmit = (data: any) => {
    console.log('Form submitted', data);
  };

  return (
    <div className="pt-32 pb-32 flex items-center justify-center bg-white">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
              <UserForm errors={errors as FieldErrors<Step1Errors>} />
            )}
            {step === 2 && (
              <AddressForm errors={errors as FieldErrors<Step2Errors>} />
            )}
            {step === 3 && (
              <AccountForm errors={errors as FieldErrors<Step3Errors>} />
            )}
            <div className="flex justify-between mt-4">
              {step > 1 && (
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={prevStep}
                >
                  Previous
                </button>
              )}
              {step < 3 ? (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={nextStep}
                >
                  Next
                </button>
              ) : (
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default SignUp;
