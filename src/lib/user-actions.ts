type FormState = {
  message: string;
};

export const addNewUser = async (prevstate: FormState, data: FormData) => {
  // Process the data
  return {
    message: "Form data processed.",
  };
};
