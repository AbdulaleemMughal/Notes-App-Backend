import validator from "validator";

export const signUpValidation = (email: string, password: string) => {
  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  }
};
