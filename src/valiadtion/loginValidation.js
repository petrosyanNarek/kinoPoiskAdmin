import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup.string().email().required("email is a required !!!"),
    password: yup.string().required('Password is required').min(6).max(15)
})