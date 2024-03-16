import { useState } from 'react';

interface ValidationErrors {
  [key: string]: string;
}

interface ValidateFunction<T> {
  (values: T): ValidationErrors;
}

function useFormValidation<T>(initialState: T, validate: ValidateFunction<T>) {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleChange = (field: keyof T, value: unknown) => {
    setValues(prev => ({ ...prev, [field]: value }));
    if (validate) {
      const validationErrors = validate(values);
      setErrors({ ...errors, ...validationErrors });
    }
  };

  const handleSubmit = (callback: () => void) => {
    if (validate) {
      const validationErrors = validate(values);
      if (Object.keys(validationErrors).length === 0) {
        callback();
      } else {
        setErrors(validationErrors);
      }
    }
  };

  return {
    values,
    setValues,
    errors,
    handleChange,
    handleSubmit,
  };
}

export default useFormValidation;
