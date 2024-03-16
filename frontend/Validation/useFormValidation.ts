import { useState, useEffect } from 'react';

interface ValidationErrors {
  [key: string]: string | undefined;
}

interface ValidateFunction<T> {
  (values: T): ValidationErrors;
}

function useFormValidation<T>(initialState: T, validate: ValidateFunction<T>) {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
    }
  }, [values, validate]);

  const handleChange = <K extends keyof T>(field: K, value: T[K]) => {
    setValues((prevValues) => ({ ...prevValues, [field]: value }));
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
    errors,
    handleChange,
    handleSubmit,
  };
}

export default useFormValidation;
