import { step1Schema,step2Schema,step3Schema } from '@/utils/schemasSigUp'; // Adjust the path 
import { z } from 'zod';

export const validateStep1 = (formData: any) => {
  try {
    step1Schema.parse(formData);
    return { valid: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors: any = {};
      error.errors.forEach(err => {
        fieldErrors[err.path[0]] = err.message;
      });
      return { valid: false, errors: fieldErrors };
    }
    return { valid: false, errors: {} };
  }
};

export const validateStep2 = (formData: any) => {
  try {
    step2Schema.parse(formData);
    return { valid: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors: any = {};
      error.errors.forEach(err => {
        fieldErrors[err.path[0]] = err.message;
      });
      return { valid: false, errors: fieldErrors };
    }
    return { valid: false, errors: {} };
  }
};




export const validateStep3 = (formData: any) => {
  try {
    step3Schema.parse(formData);
    return { valid: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors: any = {};
      error.errors.forEach(err => {
        fieldErrors[err.path[0]] = err.message;
      });
      return { valid: false, errors: fieldErrors };
    }
    return { valid: false, errors: {} };
  }
};
