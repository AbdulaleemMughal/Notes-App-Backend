export const noteValidation = (title: string, description: string) => {
    if(!title) {
        throw new Error("Title is required!.")
    }

    if(!description) {
        throw new Error("Description is required!.")
    }
}