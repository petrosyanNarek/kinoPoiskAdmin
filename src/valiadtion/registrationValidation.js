import * as yup from 'yup'
export const registerSchema = yup.object().shape({
    name: yup.string().required("name is a required !!!"),
    surname: yup.string().required("surname is a required !!!"),
    email: yup.string().email("Enter valid Email").required("email is a required !!!"),
    password: yup.string().required('Password is required').min(6).max(15),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
})