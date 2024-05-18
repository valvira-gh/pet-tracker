// USER AUTHORIZATION //
// create new user //

// sign-up component
export type FormState = {
  errors: FormErrors;
};

interface FormErrors {
  email?: string[];
  password?: string[];
}
