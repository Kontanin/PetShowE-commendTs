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
import FormSubmitButton from '@/components/Form/FormSubmitButton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import doPostRequest from '@/utils/doPostRequest';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    step1: {},
    step2: {},
    step3: {},
  });
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter(); // Initialize the router

  const schema =
    step === 1 ? step1Schema : step === 2 ? step2Schema : step3Schema;
  const methods = useForm({
    resolver: zodResolver(schema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onNextStep = (data: any) => {
    setFormData({ ...formData, [`step${step}`]: data });
    setStep(step + 1);
  };

  const onPrevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = async (data: any) => {
    const finalData = { ...formData, step3: data };
    console.log('Final Data:', finalData);

    // Perform the POST request
    const response = await doPostRequest(finalData, '/api/signup');
    if (response) {
      console.log('Successfully signed up:', response);
      // Redirect to the login page upon successful sign up
      router.push('/login');
    } else {
      console.error('Failed to sign up');
      setErrorMessage('Failed to sign up. Please try again.');
    }
  };

  return (
    <div className="pt-32 pb-32 flex items-center justify-center bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg flex max-w-4xl w-full">
        <div className="w-1/2 p-8 bg-[#F7931E] text-white rounded-l-lg flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
          <p className="mb-6">
            Join us to enjoy exclusive benefits and content.
          </p>
          <Link href="/login">
            <button className="py-2 px-4 bg-[#F15A24] hover:bg-[#F05A28] text-white font-semibold rounded-lg">
              Sign In
            </button>
          </Link>
        </div>
        <div className="w-1/2 p-8 flex flex-col justify-center min-h-[400px]">
          <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {errorMessage}</span>
            </div>
          )}
          <FormProvider {...methods}>
            <form
              onSubmit={step === 3 ? handleSubmit(onSubmit) : handleSubmit(onNextStep)}
              className="flex flex-col justify-between flex-grow"
            >
              {step === 1 && (
                <UserForm errors={errors as FieldErrors<Step1Errors>} />
              )}
              {step === 2 && (
                <AddressForm errors={errors as FieldErrors<Step2Errors>} />
              )}
              {step === 3 && (
                <AccountForm errors={errors as FieldErrors<Step3Errors>} />
              )}
              <div className={`flex ${step === 1 ? 'justify-end' : 'justify-between'} mt-4`}>
                {step > 1 && (
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={onPrevStep}
                  >
                    Previous
                  </button>
                )}
                {step < 3 ? (
                  <FormSubmitButton className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Next
                  </FormSubmitButton>
                ) : (
                  <FormSubmitButton className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Submit
                  </FormSubmitButton>
                )}
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
