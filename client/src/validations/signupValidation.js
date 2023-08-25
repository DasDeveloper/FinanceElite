import * as yup from "yup"

//Minimum eight characters, at least one letter, one number and one special character:
// const PASSWORD_REGEX = "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"

export const signupSchema = yup.object().shape({
    firstname: yup.string().required('Required'),
    lastname: yup.string().required('Required'),
    email: yup.string().email("Invalid Email.").required("Required"),
    password: yup.string().min(8).required("Required")
})