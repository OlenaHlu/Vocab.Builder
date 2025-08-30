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

export const inputWordSchema = Yup.object().shape({
  en: Yup.string()
    .required("English word is required")
    .matches(
      /\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/,
      "Only English letters, spaces, ' and - are allowed"
    ),
  ua: Yup.string()
    .required("Translation is required")
    .matches(
      /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/,
      "Only Ukrainian letters and spaces are allowed"
    ),
});
