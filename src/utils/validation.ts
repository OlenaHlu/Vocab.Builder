import * as Yup from "yup";

export const registrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name is too short")
    .max(20, "Name is too long")
    .required("Enter your name please"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is Required"),
  password: Yup.string()
    .matches(
      /^(?=(?:.*[a-zA-Z]){6})(?=(?:.*\d){1})[a-zA-Z\d]{7}$/,
      "The password must consist of of 6 English letters and 1 number."
    )
    .required("Password is Required"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=(?:.*[a-zA-Z]){6})(?=(?:.*\d){1})[a-zA-Z\d]{7}$/,
      "Invalid password format."
    )
    .required("Password is Required"),
});
