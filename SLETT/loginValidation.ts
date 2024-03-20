interface LoginFormData {
  username: string;
  password: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const loginValidation = (values: LoginFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!values.username.trim()) {
    errors.username = 'Brukernavn er påkrevd.';
  }
  if (!values.password) {
    errors.password = 'Passord er påkrevd.';
  }

  return errors;
};

export default loginValidation;
