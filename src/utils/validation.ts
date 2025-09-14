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
      "Password must be 7 characters: 6 letters + 1 number"
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

export const editWordSchema = Yup.object().shape({
  ua: Yup.string()
    .required("Translation is required")
    .matches(
      /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/,
      "Only Ukrainian letters and spaces are allowed"
    ),
  category: Yup.string().nullable().notRequired(),
  isIrregular: Yup.boolean().nullable().notRequired(),
  en: Yup.string()
    .required("English word is required")
    .matches(
      /^[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*$/,
      "Only English letters, spaces, ' and - are allowed"
    )
    .when("isIrregular", {
      is: true,
      then: (schema) =>
        schema.matches(
          /^[A-Za-z]+-[A-Za-z]+-[A-Za-z]+$/,
          "Use the format: base form - past simple - past participle (e.g., go-went-gone)"
        ),
    }),
});

export const createWordSchema = Yup.object().shape({
  en: Yup.string()
    .required("English word is required")
    .matches(
      /\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/,
      "Only English letters, spaces, ' and - are allowed"
    )
    .when("isIrregular", {
      is: true,
      then: (schema) =>
        schema.matches(
          /^[A-Za-z]+-[A-Za-z]+-[A-Za-z]+$/,
          "Use the format: base form - past simple - past participle (e.g., go-went-gone)"
        ),
    }),
  ua: Yup.string()
    .required("Translation is required")
    .matches(
      /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/,
      "Only Ukrainian letters and spaces are allowed"
    ),
  category: Yup.string().required(),
  isIrregular: Yup.boolean().when("category", {
    is: "verb",
    then: (schema) =>
      schema.required(
        "The isIrregular field is required for the 'verb' category"
      ),
  }),
});
