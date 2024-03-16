

interface UserFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender?: 'male' | 'female' | 'unspecified';
  height?: number;
  weight?: number;
  birthday?: string;
  acceptTerms?: boolean;
}

interface ValidationErrors {
  [key: string]: string;
}

const registerValidation = (values: UserFormData): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  if (!values.username) {
    errors.username = 'Navn er påkrevd.';
  }
  if (!values.email || !values.email.includes('@')) {
    errors.email = 'Vennligst oppgi en gyldig e-postadresse.';
  }
  // ... Legg til flere valideringsregler etter behov ...

  return errors;
};

export default registerValidation;
