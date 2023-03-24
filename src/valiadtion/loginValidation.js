import * as yup from "yup";
import { regexp } from "./regexpValidation";

export const loginSchema = yup.object().shape({
    email: yup.string().matches(regexp.email.reg, regexp.email.message).required("email is a required !!!"),
    password: yup.string().matches(regexp.password.reg, regexp.password.message).required('Password is required')
})