import * as yup from "yup";
import { regexp } from "./regexpValidation";

export const actorAuthorSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is a required !!!")
    .matches(regexp.firstName.reg, regexp.firstName.message)
    .min(3, "Name should be at least 3chars long")
    .max(20, "Name should be at the most 20 chars long"),
  surname: yup
    .string()
    .required("Surname is a required !!!")
    .matches(regexp.lastName.reg, regexp.lastName.message)
    .min(3, "Surname should be at least 3chars long")
    .max(20, "Surname should be at the most 20 chars long"),
  info: yup
    .string()
    .required("info is a required !!!")
    .min(10, "info  should be at least 10 chars long")
    .max(100, "info  should be at the most 100 chars long"),
});
