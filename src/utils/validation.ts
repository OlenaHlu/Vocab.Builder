import * as Yup from "yup";

export const registrationSchema = Yup.object().shape({
  name: Yup.string().min(2).max(20).required("Enter your name please"),
  email: Yup.string()
    .email("/^w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/")
    .required("Email is Required"),
  password: Yup.string()
    .min(8, "Too Short")
    .max(30, "Too Long")
    .required("Password is Required"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("/^w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Too Short")
    .max(30, "Too Long")
    .required("Password is Required"),
});
