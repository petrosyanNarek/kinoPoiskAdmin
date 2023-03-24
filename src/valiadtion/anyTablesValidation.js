import * as yup from "yup";

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
