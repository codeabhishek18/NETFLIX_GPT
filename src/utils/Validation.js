export const Validation = (email,password) =>
{
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPasswordValid = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/.test(password);

    if(!isEmailValid)
        return "Enter a valid email";

    if(!isPasswordValid)
        return "Enter a valid password";

    return null;
}