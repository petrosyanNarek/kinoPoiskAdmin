import * as yup from "yup";
export const regexp = {
  name: {
    reg: /^[A-Z][a-z]*$/,
    message:
      "Only alphabets are allowed and first letter must been to upper case",
  },
  firstAndLastName: {
    reg: /^([a-zA-Z]{2,}\\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\\s?([a-zA-Z]{1,})?)/,
    message:
      "Only alphabets are allowed and first letter must been to upper case",
  },
};
export const anySchema = (name, minLength, maxLength, reg) => {
  return yup.object().shape({
    name: yup
      .string()
      .required(`${name} name is a required !!!`)
      .matches(reg.test, reg.message)
      .min(minLength, `${name} should be at least ${minLength} chars long`)
      .max(maxLength, `${name} should be at the most ${maxLength} chars long`),
  });
};
