export interface UserFormData {
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
  if (values.password.length < 1) {
    errors.password = 'Passordet må være minst 6 tegn langt.';
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passordene stemmer ikke overens.';
  }
  if (!values.acceptTerms) {
    errors.acceptTerms = 'Du må akseptere vilkårene for å fortsette.';
  }
 
  return errors;
};

export default registerValidation;
