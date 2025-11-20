import validator from "validator";
export const signUpValidation = (email, password) => {
    if (!validator.isEmail(email)) {
        throw new Error("Email is not valid");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong");
    }
};
//# sourceMappingURL=signUpValidation.js.map