import * as yup from 'yup'
import { regexp } from './regexpValidation'
export const registerSchema = yup.object().shape({
    name: yup.string().required("name is a required !!!"),
    surname: yup.string().required("surname is a required !!!"),
    email: yup.string().matches(regexp.email.reg, regexp.email.message).required("email is a required !!!"),
    password: yup.string().matches(regexp.password.reg, regexp.password.message).required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
})