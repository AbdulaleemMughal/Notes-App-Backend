export const noteValidation = (title, description) => {
    if (!title) {
        throw new Error("Title is required!.");
    }
    if (!description) {
        throw new Error("Description is required!.");
    }
};
//# sourceMappingURL=noteValidation.js.map